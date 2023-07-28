

Highcharts.chart('container', {
    chart: {
        polar: true
    },

    title: {
        text: 'Flavor Chart'
    },


    pane: {
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        labels: {
            formatter: function() {
                let label;
                switch (this.value) {
                    case 0:
                        label = 'Berry';
                        break
                    case 1:
                        label = 'Citrus';
                        break
                    case 2:
                        label = 'Stone fruit'
                        break
                    case 3:
                        label = 'Grassy'
                        break
                    case 4:
                        label = 'Floral'
                        break
                    case 5: 
                        label = 'Spicy'
                        break
                    case 6:
                        label = 'Mineral'
                        break
                    case 7:
                        label = 'Sweet'
                        break
                    case 8:
                        label = 'Sour'
                        break
                    case 9:
                        label = 'Woody'
                        break
                    case 10:
                        label = 'Tannic'
                        break
                }

                return label;
            }
        }
    },

    series: [{
        type: 'line',
        name: 'wine 1',
        data: [8, 2, 4, 2, 3, 6, 9, 0, 6, 2, 3]
    }]
});






// let wineCanvas = document.getElementById("wineChart");

// let wineData = {
//     labels: ["berry", "citrus", "stone fruit", "herbal/grassy", "floral", "spicy", "mineral", "sweet", "sour/tart", "woody", "tannic" ],
//     datasets: [{
//         label: "wine A",
//         backgroundColor: "rgba(200,0,0,0.2)",
//         data: [10, 7, 3, 5, 2, 8, 6, 8, 3, 10,4 ]
//     }]
// };

// let wineChart = new Chart(wineCanvas, {
//     type: 'radar', 
//     data: wineData
// });