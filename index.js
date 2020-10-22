const { CanvasRenderService } = require('chartjs-node-canvas');
const fs = require('fs');
const width = 600;
const height = 400;
const chartCallback = (ChartJS) => {

    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
        // plugin implementation
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
    });
};
const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

(async () => {
    const configuration = {
        type: 'doughnut',
        data: {
            labels: ["ANGRY", "HAPPY", "SAD", "AFRAID", "DISGUST", "SUPRISE", "NERVOUS", "ADMIRATION"],
            datasets: [{
                label: ["情緒分析"],
                data: [12, 19, 3, 5, 2, 3,5,5],
                backgroundColor: [
                    "rgba(255, 141, 141, 0.8)",
                    "rgba(255, 255, 83, 0.8)", 
                    "rgba(80, 80, 255, 0.8)", 
                    "rgba(141, 199, 141, 0.8)",
                    "rgba(220, 75, 220, 0.8)",
                    "rgba(255, 169, 83, 0.8)",
                    "rgba(88, 190, 255, 0.8)",
                    "rgba(0, 181, 0, 0.8)"],
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero: true,
            //             callback: (value) => '$' + value
            //         }
            //     }]
            // }
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '情緒分析'
            },
            animation: {
                animateScale: false,
                animateRotate: false
            }
        }
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    const dataUrl = await canvasRenderService.renderToDataURL(configuration);
    const stream = canvasRenderService.renderToStream(configuration);
    fs.writeFileSync('img.png', image);
})();

// "rgb(255, 99, 132)",
// "rgb(255, 159, 64)",
// "rgb(255, 205, 86)",
// "rgb(75, 192, 192)",
// "rgb(54, 162, 235)",
// "rgb(153, 102, 255)",
// "rgb(201, 203, 207)",
// "rgb(240, 243, 247)"