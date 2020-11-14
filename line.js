
 function line()
 {
 d3.csv("test.csv", function(data) {
var margin = {top: 10, right: 20, bottom: 40, left: 70},
    width = 450 - margin.left - margin.right,
    height =450 - margin.top - margin.bottom;
    

	var svg3 = d3.select("#cubic").append("svg")
   .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
            
    var allGroup = d3.map(data, function(d){return(d.place)}).keys()

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeTableau10);

    // Add X axis --> it is a date format
	
	
   var x1 = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
    svg3.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1).ticks(10)
	  .tickFormat(d3.format("d")));

    // Add Y axis
    var y1 = d3.scaleLinear()
      .domain([0, 2000])
      .range([ height, 0 ]);
    svg3.append("g")
      .call(d3.axisLeft(y1)
	  .tickValues([50,150,250,350,450,550,650,750,850,950,1050,1150,1250,1350,1450,1550,1650,1750,1850])
	   .tickFormat(d3.format("d")));
	  
	  
	  
	  
	  svg3.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
	.attr("y", 405)
	.attr("x", 200)
	.attr("dy", "2em")
	.text("Years");
	//.style("stroke", "black");


svg3.append("text")
	.attr("class", "y label")
	.attr("text-anchor", "end")
	.attr("y", -80)
	.attr("x", -50)
	.attr("dy", "2em")
	.attr("transform", "rotate(-90)")
	.text("Produced movies/tv shows(years)");
	//.style("stroke", "black");
	  
	  
	  
	  
    // Initialize line with first group of the list
    var line = svg3
      .append('g')
      .append("path")
        .datum(data.filter(function(d){return d.place==allGroup[0]}))
        .attr("d", d3.line()
          .x(function(d) { return x1(d.year) })
          .y(function(d) { return y1(d.tvshow) })
        )
        .attr("stroke", function(d){ return myColor("red") }
		)
        .style("stroke-width", 4)
        .style("fill", "none")
		
		 var line2 = svg3
      .append('g')
      .append("path")
        .datum(data.filter(function(d){return d.place==allGroup[0]}))
        .attr("d", d3.line()
          .x(function(d) { return x1(d.year) })
          .y(function(d) { return y1(d.movie) })
        )
        .attr("stroke", function(d){ return myColor("black") })
        .style("stroke-width", 4)
        .style("fill", "none")

    //  update the chart
    function update(selectedGroup) {

    
      var dataFilter = data.filter(function(d){return d.place==selectedGroup})

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x1(d.year) })
            .y(function(d) { return y1(d.tvshow) })
          )
          .attr("stroke", function(d){ return myColor("red") })
		  
		  
		  
		    var dataFilter = data.filter(function(d){return d.place==selectedGroup})

      // update line
      line2 	
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x1(d.year) })
            .y(function(d) { return y1(d.movie) })
          )
          .attr("stroke", function(d){ return myColor("black") })
    }

    //
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
		console.log(selectedOption);
        update(selectedOption);
		if(selectedOption=="Average")
		{
		horizontal(selectedOption)
		console.log(selectedOption)
		}
		
    })
	
	
	
	
	
})




}


//top shows
function horizontal(selectedOption)

{

			   
			console.log("this")   
			  
if(selectedOption=="Average")
{


	 console.log("hori entered")
   
	 d3.selectAll(".rect")
					.remove()
					.exit()				
					
   var margin1 = {top: 20, right: 10, bottom: 50, left: 50},
    width1 = 500 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;
       // d3.selectAll("svg").remove();
        svg = d3.select("#hori").append("svg")
        .attr("width", width1 + margin1.left + margin1.right)
        .attr("height", height1 + margin1.top + margin1.bottom)
        .append("g")
        .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
        
		
		
		
		
		var x = d3.scaleBand()
    .range([0, width1], .1, 1)
	 .paddingInner(0.1)
  .paddingOuter(0.1);
var y = d3.scaleLinear()
    .range([height1, 0])
	.domain(7,10);
var xAxis = d3.axisBottom()
    .scale(x);
	//.tickValues(7,7.5,8,8.5,9,9.5,10)
    
var yAxis = d3.axisLeft()
    .scale(y)
		
		
		
		
    	d3.csv("test.csv", function(error, data) {
    				data.forEach(function(d) {
    						d.total_imdb = +d.total_imdb;
    										});
      
    				Dataset=data;
    				x.domain(data.map(function(d) { return d.total; }));
    				y.domain([7, d3.max(data, function(d) { return d.total_imdb; })]);
    				
					
					
					svg.append("g")
    				.attr("class", "x axis")
    				.attr("transform", "translate(0," + height1 + ")")
    				
				
				.call(xAxis)
    				.append("text")
//.attr("class", "x axis")

      .attr("transform", "translate(-10,0)rotate(-45)");

	
    				
    				svg.append("g")
    				.attr("class", "y axis")
    				.call(yAxis);

    				svg.selectAll(".bar")
    				.data(data)
    				.enter().append("rect")
    				.attr("class", "bar")
					.style("fill","#fb7b6b")
    				.attr("x", function(d) { return x(d.total); })
    				.attr("width", x.bandwidth())
    				.attr("y", function(d) { return y(d.total_imdb); })
    				.attr("height", function(d) { return height1 - y(d.total_imdb); })
    				
	   

			   
			   })
			   }
			   
			   	

}


