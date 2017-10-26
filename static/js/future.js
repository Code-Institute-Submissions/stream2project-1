queue()
   .defer(d3.json, "/donorsUS/or_projects")
   .await(makeGraphsOr);

function makeGraphsOr(error, projectsJson) {

   //Clean projectsJson data
   var donorsUSProjects = projectsJson;
   var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
   donorsUSProjects.forEach(function (d) {
       d["date_posted"] = dateFormat.parse(d["date_posted"]);
       d["date_posted"].setDate(1);
       d["total_donations"] = +d["total_donations"];
   });

   //Create a Crossfilter instance
   var ndx = crossfilter(donorsUSProjects);

   //Define Dimensions
   var resourceTypeDim = ndx.dimension(function (d) {
       return d["resource_type"];
   });

   //Calculate metrics
   var numProjectsByResourceType = resourceTypeDim.group();

   //Define values (to be used in charts)
   //var minDate = dateDim.bottom(1)[0]["date_posted"];
   //var maxDate = dateDim.top(1)[0]["date_posted"];

   //Charts
   var resourceTypeChart = dc.rowChart("#resource-type-row-chart-or");


  resourceTypeChart
       .width(300)
       .height(250)
       .dimension(resourceTypeDim)
       .group(numProjectsByResourceType)
       .xAxis().ticks(4);

   dc.renderAll();
}
