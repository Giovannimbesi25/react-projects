import CanvasJSReact from '../../canvasjs.react';
import "./chart.scss";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {

  const options = {
    animationEnabled: true,
    animationDuration: 2000,
    
    title: {
      fontSize: 18,
      fontWeight: "bold",
      text: "Title Example"
    },
    axisX:{      
      valueFormatString: "DD-MMM" ,
    },
    axisY: {
      gridThickness: 0,
      tickLength: 0,
      lineThickness: 0,
      labelFormatter: function(){
        return " ";
      }
    },           
    data: [{
      type: "splineArea",
      color: "rgba(100,57,255, 0.5)",
      dataPoints: [

        { x: new Date(2012, 6, 15), y: 0},       
        { x: new Date(2012, 6, 18), y: 20 }, 
        { x: new Date(2012, 6, 23), y: 30 }, 
        { x: new Date(2012, 7, 1), y: 10}, 
        { x: new Date(2012, 7, 11), y: 21}, 
        { x: new Date(2012, 7, 23), y: 50} ,
        { x: new Date(2012, 7, 31), y: 75}, 
        { x: new Date(2012, 8, 4), y: 10},
        { x: new Date(2012, 8, 10), y: 12},
        { x: new Date(2012, 8, 13), y: 15}, 
        { x: new Date(2012, 8, 16), y: 17}, 
        { x: new Date(2012, 8, 18), y: 20}, 
        { x: new Date(2012, 8, 21), y: 22}, 
        { x: new Date(2012, 8, 24), y: 25}, 
        { x: new Date(2012, 8, 26), y: 27}, 
        { x: new Date(2012, 8, 28), y: 30} 
        ]
    }]
  }
  return (
    <div className="chart">
        <CanvasJSChart options = {options}
			/>
    </div>
  );
};

export default Chart;