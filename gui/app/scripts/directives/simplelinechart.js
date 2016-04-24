'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:simpleLineChart
 * @description
 * # simpleLineChart
 */
angular.module('frontendApp')
  .directive('simpleLineChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        reading: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var margin = {top: 20, right: 50, bottom: 30, left: 50},
            width = 700 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

          var formatDate = d3.time.format('%Y-%m-%d %H:%m:%S'),
            formatHour = d3.time.format('%H:00'),
            parseDate = formatDate.parse,
            bisectDate = d3.bisector(function(d) { return d.date; }).left;

          var x = d3.time.scale()
            .range([0, width]);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.reading); });

          var container = d3.select(element[0]);
          var svg = container.append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
           .append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          scope.$watch('reading', function(newVal){
            svg.selectAll(".replace").remove();

            //d3.tsv("data/data.tsv", function(error, data){
            d3.json("http://localhost:1465/readings?readingsource=Station1&from=2014-02-10%2005:00:00&to=2014-02-18%2004:00:00&readings=readingsource,readingdatetime,"+scope.reading.id, function(error, data){
              if (error) return console.warn(error);
              scope.data = [];
              var yLabel = "";
              data.Items.forEach(function(d) {
                //console.log(d);
                var item = {};
                //item.date = parseDate(d['Time[UTC+0.0]']);
                //item.reading = +d['tmp[C]'];
                item.date = parseDate(d['readingdatetime']);
                item.reading = d[scope.reading.id].Value;
                scope.data.push(item);
                yLabel = scope.reading.name + " (" + d[scope.reading.id].Unit + ")";
              });
              //console.log(scope.data);

              x.domain(d3.extent(scope.data, function(d) { return d.date; }));
              y.domain(d3.extent(scope.data, function(d) { return d.reading; }));

              svg.append('g')
                .attr('class', 'x axis replace')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

              svg.append('g')
                .attr('class', 'y axis replace')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(yLabel);

              svg.append('path')
                .datum(scope.data)
                .attr('class', 'line replace')
                .attr('d', line);

              var focus = svg.append("g")
                .attr("class", "focus replace")
                .style("display", "none");

              focus.append("circle")
                .attr("r", 4.5);

              focus.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");
              focus.select("text")
                .append("tspan")
                .attr("x", 0)
                .attr("dy", 0)
                .attr("class", "text-date");
              focus.select("text")
                .append("tspan")
                .attr("x", 0)
                .attr("dy", 16)
                .attr("class", "text-reading");

              svg.append("rect")
                .attr("class", "overlay replace")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);

              function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(scope.data, x0, 1),
                    d0 = scope.data[i - 1],
                    d1 = scope.data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x(d.date) + "," + y(d.reading) + ")");
                focus.select(".text-date").text(formatHour(d.date));
                focus.select(".text-reading").text(d.reading);
              }
            });
          });
        });
      }};
    }]);

