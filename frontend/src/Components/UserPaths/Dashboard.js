import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function Dashboard(){
    const options = {
        animationEnabled: true,
        theme:'',	
        title:{
            text: "User Analysis",
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            name: "Profile Visits",
            dataPoints: [
                { y: 155, label: "Jan" },
                { y: 150, label: "Feb" },
                { y: 152, label: "Mar" },
                { y: 148, label: "Apr" },
                { y: 142, label: "May" },
                { y: 150, label: "Jun" },
                { y: 146, label: "Jul" },
                { y: 149, label: "Aug" },
                { y: 153, label: "Sept" },
                { y: 158, label: "Oct" },
                { y: 154, label: "Nov" },
                { y: 150, label: "Dec" }
            ]
        },
        {
            type: "spline",
            name: "Views",
            axisYType: "secondary",
            dataPoints: [
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 175, label: "Mar" },
                { y: 172, label: "Apr" },
                { y: 162, label: "May" },
                { y: 165, label: "Jun" },
                { y: 172, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" }
            ]
		}]
	}
    return <>
    <div className="grid md:grid-cols-2 gap-5 grid-rows-1 ">
        <div className="py-5 px-2 rounded-xl shadow-2xl ">
            <CanvasJSChart options = {options}/>
        </div>
    </div>
    </>
}