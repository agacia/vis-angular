function MMap() {	
	var selector = 'map-container'
		, lat = 40.399817
		, lng = -100.147422
		, zoom = 4
		, map = null
		, path = null 
		, feature = null
		, svg = null
		, g = null

	var map = function() {
		
	}

	map.load = function(url) {
		queue()
		    .defer(d3.json, url) // topojson polygons
		    // .defer(d3.json, 'data/cities.json') // geojson points
		    .await(makeMyMap); // function that uses files
	}

	var makeMyMap = function(error, states, cities) {
	    // console.log("loaded", error, states)
	    // ad d3 svg overlay
	    var collection = topojson.feature(states, states.objects.counties);
		initializeMapOverlay(collection);

	}

	map.initialize = function() { 
		var m = $("#"+selector)
		m.innerHTML="aa";
		console.log("m", m, "L", L, "selector", selector)

		map = new L.Map(selector);
		var layer = new L.StamenTileLayer("toner-lite");
		// this.margin_top = 10;
		// this.margin_bottom = 10;
		map.addLayer(layer);
		map.setView(new L.LatLng(lat, lng), zoom); 
		
	}

	var initializeMapOverlay = function(collection) {
		var overlayPane = d3.select(map.getPanes().overlayPane);
		svg = overlayPane.append("svg");
		svg
			.attr("width", $("#"+selector).width())
			.attr("height", $("#"+selector).height())
			.style("margin-left", "0px")
			.style("margin-top", "0px");
		g = svg.append("g").attr("class", "leaflet-zoom-hide");
		var transform = d3.geo.transform({point: projectPoint});
    	path = d3.geo.path().projection(transform);
    	feature = g.selectAll("path")
		    .data(collection.features)
			  .enter().append("path");
		feature.attr("d", path);
  		map.on("viewreset", function (e) { reset(collection) }, this );
  		reset(collection);
	}

	function reset(collection) {
		var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];
	    svg .attr("width", bottomRight[0] - topLeft[0])
	        .attr("height", bottomRight[1] - topLeft[1])
	        .style("left", topLeft[0] + "px")
	        .style("top", topLeft[1] + "px");

	    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
	    feature.attr("d", path);
	}
	function projectPoint(x, y) {
	  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
	  this.stream.point(point.x, point.y);
	}
	return map;
}
		