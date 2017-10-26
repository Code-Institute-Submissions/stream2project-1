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
   var studentsReachedDim = ndx.dimension(function (d) {
       return d["students_reached"]
   })





   //Calculate metrics
   var totalStudentsReached = studentsReachedDim.groupAll().reduceSum(function (d) {
       return d["students_reached"];
   });



   //Define values (to be used in charts)
   //var minDate = dateDim.bottom(1)[0]["date_posted"];
   //var maxDate = dateDim.top(1)[0]["date_posted"];

   //Charts
   var totalStudentsReachedND = dc.numberDisplay("#number-students-reached-nd-or");


  totalStudentsReachedND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalStudentsReached)
       .formatNumber(d3.format(".3s"));




   dc.renderAll();
}

queue()
   .defer(d3.json, "/donorsUS/ny_projects")
   .await(makeGraphsNY);

function makeGraphsNY(error, projectsJson) {

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
   var studentsReachedDim = ndx.dimension(function (d) {
       return d["students_reached"]
   })





   //Calculate metrics
   var totalStudentsReached = studentsReachedDim.groupAll().reduceSum(function (d) {
       return d["students_reached"];
   });



   //Define values (to be used in charts)
   //var minDate = dateDim.bottom(1)[0]["date_posted"];
   //var maxDate = dateDim.top(1)[0]["date_posted"];

   //Charts
   var totalStudentsReachedND = dc.numberDisplay("#number-students-reached-nd-ny");


  totalStudentsReachedND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalStudentsReached)
       .formatNumber(d3.format(".3s"));




   dc.renderAll();
}
