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
   var dateDim = ndx.dimension(function (d) {
       return d["date_posted"];
   });

   var totalDonationsDim = ndx.dimension(function (d) {
       return d["total_donations"];
   });





   //Calculate metrics
   var numProjectsByDate = dateDim.group();

    var all = ndx.groupAll();



   var totalDonations = ndx.groupAll().reduceSum(function (d) {
       return d["total_donations"];
   });



   //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["date_posted"];
   var maxDate = dateDim.top(1)[0]["date_posted"];

   //Charts
   var timeChart = dc.barChart("#time-chart-or");

   var numberProjectsND = dc.numberDisplay("#number-projects-nd-or");


   numberProjectsND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);

    timeChart
       .width(1100)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(numProjectsByDate)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);



   dc.renderAll();
}
