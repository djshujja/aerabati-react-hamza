// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import axios from "axios";


// const Chart = () => {
//   const [chartData, setChartData] = useState({});
//   const [employeeSalary, setEmployeeSalary] = useState([]);
//   const [employeeAge, setEmployeeAge] = useState([]);
//   const chart = () => {
//     let empSal = [];
//     let empAge = [];
//     axios
//       .get(`https://aerbeti-bck-test.herokuapp.com/api/bookings`)
//       .then(res => {
//         console.log(res);
//         for (const dataObj of res.data.data) {
//           empSal.push(parseInt(dataObj.length));
//           empAge.push(parseInt(dataObj.createdAt));
//         }
//         setChartData({
//           labels: empAge,
//           datasets: [
//             {
//               label: "level of thiccness",
//               data: empSal,
//               backgroundColor: ["rgba(75, 192, 192, 0.6)"],
//               borderWidth: 4
//             }
//           ]
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     console.log(empSal, empAge);
//   };
//   useEffect(() => {
//     chart();
//   }, []);
//   return (
//     <div className="App">
//       <h1>Dankmemes</h1>
//       <div>
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             title: { text: "THICCNESS SCALE", display: true },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     autoSkip: true,
//                     maxTicksLimit: 10,
//                     beginAtZero: true
//                   },
//                   gridLines: {
//                     display: false
//                   }
//                 }
//               ],
//               xAxes: [
//                 {
//                   gridLines: {
//                     display: false
//                   }
//                 }
//               ]
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chart;
// 
import React, {useEffect, useState}from 'react';
import {Line} from 'react-chartjs-2';

function Chart() {
    const [chartData,setchartData]=useState({})
    const chartjs=()=>{
        setchartData({
            labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
            datasets: [{
                label: 'abc',
                data: [32,45,22,11,28,22,2],
                // backgroundColor: [red],
                borderWidth:4
            }]
        })
    }
    useEffect(()=>{
        chartjs()
    },[])
    return (
        <div>
            <Line data={chartData}></Line>
        </div>
    )
}

export default Chart
