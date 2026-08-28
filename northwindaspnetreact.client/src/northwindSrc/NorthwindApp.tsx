import { useEffect, useState } from 'react';
import '../App.css';

interface Order {
    orderId: number;
    customerId: string;
    employeeId: number;
    orderDate: string;
}

function NorthwindApp() {
    const [orders, setOrders] = useState<Order[]>();

    useEffect(() => {
        getOrders();
    }, []);

    const contents = orders === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>CustomerId</th>
                    <th>EmployeeId</th>
                    <th>OrderDate</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order =>
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.customerId}</td>
                        <td>{order.employeeId}</td>
                        <td>{order.orderDate}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Orders</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function getOrders() {
        const response = await fetch('order');
        if (response.ok) {
            console.log("SUCCESS order!!!");
            const data = await response.json();
            setOrders(data);
        }
        else
            console.log("ERROR order!!!");
    }
}

export default NorthwindApp;