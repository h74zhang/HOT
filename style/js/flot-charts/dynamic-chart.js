$(document).ready(function(){
    
    /* Make some random data*/
    var data = [];
    var totalPoints = 300;
    var updateInterval = 100;
    var x_value = 0;

    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        while (data.length < totalPoints) {
    
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            } 

            data.push(y);
        }

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([x_value+i, data[i]])
        }

        return res;
    }

    function suffixFormatter(val, axis) {
        if (val > 1000000)
            return (val / 1000000).toFixed(axis.tickDecimals) + " MB";
        else if (val > 1000)
            return (val / 1000).toFixed(axis.tickDecimals) + " kB";
        else
            return val.toFixed(axis.tickDecimals) + " B";
    }

    /* Create Chart */
    if ($('#dynamic-chart')[0]) {
        var plot = $.plot("#dynamic-chart", [ getRandomData() ], {
            series: {
                label: "Bandwidth",
                lines: {
                    show: true,
                    lineWidth: 0.2,
                    fill: 0.6
                },
    
                color: '#00BCD4',
                shadowSize: 0,
            },
            yaxis: {
                min: 0,

                tickColor: '#eee',
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#9f9f9f",
                },
                shadowSize: 0,
                tickFormatter: suffixFormatter,
            },
            xaxis: {
                tickColor: '#eee',
                show: false,
                font :{
                    lineHeight: 13,
                    style: "normal",
                    color: "#9f9f9f",
                },
                shadowSize: 0,
                min: 0,
            },
            grid: {
                borderWidth: 1,
                borderColor: '#eee',
                labelMargin:10,
                hoverable: true,
                clickable: true,
                mouseActiveRadius:6,
            },
            legend:{
                container: '.flc-dynamic',
                backgroundOpacity: 0.5,
                noColumns: 0,
                backgroundColor: "white",
                lineWidth: 0
            }
        });
    }

    /* Update */    
    function update() {
        plot.setData([getRandomData()]);
        plot.setupGrid();
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
});