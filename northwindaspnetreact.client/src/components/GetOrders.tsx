import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
//import '../App.css';

interface Order {
    orderId: number;
    customerId: string;
    employeeId: number;
    orderDate: string;
}

function GetOrders() {

    const [orders, setOrders] = useState<Order[]>();

    useEffect(() => {
        getOrders();
    }, []);

    const navigate = useNavigate();

    const handleDelete = async (id: number) => {

        const response = await fetch(`/api/order/${id}`, { method: 'DELETE' });
        if (response.ok) {
            console.log("SUCCESS delete order!!!");
            setOrders(orders?.filter(o => o.orderId != id));
        }
        else
            console.log("ERROR delete order!!!");
    }

    const handleEdit = (idFromParam) => {
        //F alert(`Handle Edit for student with ID: ${id}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLE
        navigate(`/update/${idFromParam}`)

    }

    // const handleEditQueryParam = (queryParamId) => {
    //     // alert(`Handle Edit for student with ID: ${queryParamId}`);

    //     // Trigger navigation to the update page using useNavigate
    //     // USING PATH VARIABLEQueryParam
    //     navigate(`/update?queryParamId=${queryParamId}`);

    // }

    // const contents = orders === undefined
    //     ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //     : <table className="table table-striped" aria-labelledby="tableLabel">
    //         <thead>
    //             <tr>
    //                 <th>Id</th>
    //                 <th>CustomerId</th>
    //                 <th>EmployeeId</th>
    //                 <th>OrderDate</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {orders.map(order =>
    //                 <tr key={order.orderId}>
    //                     <td>{order.orderId}</td>
    //                     <td>{order.customerId}</td>
    //                     <td>{order.employeeId}</td>
    //                     <td>{order.orderDate}</td>
    //                 </tr>
    //             )}
    //         </tbody>
    //     </table>;

    const contents = orders === undefined
        ? <p><em> Loading...Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">CustomerId</th>
                    <th scope="col">EmployeeId</th>
                    <th scope="col">OrderDate</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => 
                <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerId}</td>
                    <td>{order.employeeId}</td>
                    <td>{order.orderDate}</td>
                    <td>
                        <button className="btn btn-warning btn-md mr-2" onClick={() => handleEdit(order.orderId)}>Edit with path variable</button>
                        <button className="btn btn-danger btn-md" onClick={() => handleDelete(order.orderId)}>Delete</button>
{/*                         <button className="btn btn-success btn-md mr-2" onClick={() => handleEditQueryParam(order.orderId)}>Edit with query-param</button> */}
                    </td>
                </tr>)}
            </tbody>
        </table>

return (
    <div>
        <h2 id="tableLabel">Заказы</h2>
        {/* <p>This component demonstrates fetching data from the server.</p> */}
        {contents}
    </div>
);

    async function getOrders() {
        const response = await fetch('/api/order');
        if (response.ok) {
            console.log("SUCCESS order!!!");
            const data = await response.json();
            setOrders(data);
        }
        else
            console.log("ERROR order!!!");
    }

    
}

export default GetOrders;