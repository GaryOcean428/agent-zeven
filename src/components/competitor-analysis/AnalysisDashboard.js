"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisDashboard = AnalysisDashboard;
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.BarElement, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.RadialLinearScale, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.Filler);
function AnalysisDashboard(_a) {
    var competitors = _a.competitors, metrics = _a.metrics;
    var radarData = {
        labels: ['Branding', 'Features', 'UX', 'Technical', 'Marketing', 'Mobile', 'Market', 'Innovation'],
        datasets: competitors.map(function (competitor, index) { return ({
            label: competitor.name,
            data: Object.values(competitor.scores),
            backgroundColor: "rgba(59, 130, 246, ".concat(0.2 + (index * 0.1), ")"),
            borderColor: "rgba(59, 130, 246, ".concat(0.8 + (index * 0.1), ")"),
            borderWidth: 2,
            fill: true
        }); })
    };
    var barData = {
        labels: competitors.map(function (c) { return c.name; }),
        datasets: [{
                label: 'Market Share',
                data: competitors.map(function (c) { return c.metrics.marketShare; }),
                backgroundColor: 'rgba(59, 130, 246, 0.8)'
            }]
    };
    return (<div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<div key={key} className="card p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="text-2xl font-bold">{value}</div>
          </div>);
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-4">Competitive Analysis</h3>
          <div className="aspect-square">
            <react_chartjs_2_1.Radar data={radarData} options={{
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }}/>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium mb-4">Market Share Distribution</h3>
          <react_chartjs_2_1.Bar data={barData} options={{
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) { return "".concat(value, "%"); }
                    }
                }
            }
        }}/>
        </div>
      </div>
    </div>);
}
