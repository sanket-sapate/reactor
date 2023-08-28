import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const randomArray = (length) => {
    var array = [];
    var num = 100
    for (var i = 0; i < length; i++) {
        if(i<length/2){
            num += Math.floor(Math.random() * 5) - Math.floor(Math.random() * 5);
        }else{
            num += Math.floor(Math.random() * 5) - Math.floor(Math.random() * 4);
        }
        if(num<100){
            num = 101
        }
        array.push({y:num,x:new Date(2021,5,i)});
    }
    return array;
}
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
        axisY: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
            return " ";
            }
        },
        axisY2: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
                return " ";
            }
        },
        axisX:{
            gridThickness: 0,
            tickLength: -6,
            labelFormatter:function(){
                return "";
            }
        },
        data: [{
            type: "spline",
            name: "Profile Visits",
            dataPoints: randomArray(500)
        }],
        zoomEnabled: true,
        height: 300,
	}
    return <>
    <div className="grid md:grid-cols-2 gap-5 grid-rows-1 ">
        <div className="py-5 px-2 rounded-xl shadow-2xl ">
            <CanvasJSChart options = {options}/>
        </div>
        <div className="px-2 grid grid-cols-2 grid-rows-2 gap-3 h-64 md:h-auto ">
            <div className="flex flex-col items-center justify-center rounded-xl shadow-xl">
                <p className="text-2xl font-bold text-gray-900">Upvotes</p>
                <h1 className="text-2xl font-bold text-gray-900">100</h1>
            </div>
            <div className="flex flex-col  items-center justify-center rounded-xl shadow-xl">
                <p className="text-2xl font-bold text-gray-900">DownVotes</p>
                <h1 className="text-2xl font-bold text-gray-900">10</h1>
            </div>
            <div className="flex flex-col  items-center justify-center rounded-xl shadow-xl">
                <p className="text-2xl font-bold text-gray-900">Shares</p>
                <h1 className="text-2xl font-bold text-gray-900">100</h1>
            </div>
            <div className="flex flex-col  items-center justify-center rounded-xl shadow-xl">
                <p className="text-2xl font-bold text-gray-900">Total Views</p>
                <h1 className="text-2xl font-bold text-gray-900">100</h1>
            </div>
        </div>
    </div>
    </>
}