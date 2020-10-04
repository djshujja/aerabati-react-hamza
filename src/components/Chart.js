// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import axios from "axios";
//
//
// const Chart = () => {
//   const [chartData, setChartData] = useState({});
//   const [employeeSalary, setEmployeeSalary] = useState([]);
//   const [employeeAge, setEmployeeAge] = useState([]);
//
//   const chart = () => {
//     let empSal = [];
//     let empAge = [];
//     axios
//       .get(`https://aerbeti-bck-test.herokuapp.com/api/bookings`)
//       .then(res => {
//         // console.log(res);
//         // console.log(
//         //   res.data.filter(a => a.createdAt.substr(0,10))
//         // );
//         let x;
//         res.data.filter(ourData => {
//           x = ourData.createdAt.includes('Oct')
//           console.log(x)
//           // empSal.push(parseInt(x))
// }).map(filteredData => {
//           console.log(filteredData)
//
//
//         for (const dataObj of res.data) {
//           empSal.push((res.data.length));
//           empAge.push((dataObj.createdAt.substr(0,10)));
//         }
//         })
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
//
//   useEffect(() => {
//     chart();
//   }, []);
//   return (
//     <div className="App">
//       <h1>Leads Data</h1>
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
//
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
                label: 'Leads',
                data: [32,15,66,70,88,25,97],
                              backgroundColor: ["rgba(75, 192, 192, 0.6)"],

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
