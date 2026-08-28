import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        console.log("SUCCESS!!!");
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

// interface Order {
//     id: number;
//     customerId: string;
//     employeeId: number;
//     orderDate: string;
// }

// function App() {
//     const [orders, setOrders] = useState<Order[]>();

//     useEffect(() => {
//         getOrders();
//     }, []);

//     const contents = orders === undefined
//         ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//         : <table className="table table-striped" aria-labelledby="tableLabel">
//             <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>CustomerId</th>
//                     <th>EmployeeId</th>
//                     <th>OrderDate</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {orders.map(order =>
//                     <tr key={order.id}>
//                         <td>{order.id}</td>
//                         <td>{order.customerId}</td>
//                         <td>{order.employeeId}</td>
//                         <td>{order.orderDate}</td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>;

//     return (
//         <div>
//             <h1 id="tableLabel">Orders</h1>
//             <p>This component demonstrates fetching data from the server.</p>
//             {contents}
//         </div>
//     );

//     async function getOrders() {
//         const response = await fetch('weatherforecast/orders');
//         if (response.ok) {
//             console.log("SUCCESS!!!");
//             const data = await response.json();
//             setOrders(data);
//         }
//         else
//             console.log("ERROR!!!");
//     }
// }

export default App;