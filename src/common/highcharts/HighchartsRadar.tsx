import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useHasMounted from "../../utils/hasMounted";

const HighchartsRadar: React.FC<{}> = (props) => {
  const options = {
    chart: {
      polar: true
    },
    title: {
      text: "Highcharts Polar (Radar) Chart"
    },
    pane: {
        startAngle: 0,
        endAngle: 360
    },
    xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
            format: '{value}°'
        }
    },
    yAxis: {
        min: 0
    },
    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 45
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },
    series: [{
        type: 'column',
        name: 'Column',
        data: [8, 7, 6, 5, 4, 3, 2, 1],
        pointPlacement: 'between'
    }, {
        type: 'line',
        name: 'Line',
        data: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
        type: 'area',
        name: 'Area',
        data: [1, 8, 2, 7, 3, 6, 4, 5]
    }]
  }
  return  (
    <div id="highcharts-radar">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={options}
        />
    </div>
  )
}

export default HighchartsRadar;