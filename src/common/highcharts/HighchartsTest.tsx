import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import useHasMounted from "../../utils/hasMounted";

const HighchartsTest: React.FC<{}> = (props) => {
  const options = {
    chart: {
      type: "spline"
    },
    title: {
      text: "My chart"
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  }
  return  (
    <div id="highcharts-test">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
        />
    </div>
  )
}

export default HighchartsTest;