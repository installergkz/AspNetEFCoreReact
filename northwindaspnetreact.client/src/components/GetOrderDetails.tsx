import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router";
//import '../App.css';

// interface OrderDetails {
//     orderId: number;
//     unitPrice: number;
//     quantity: number;
//     discount: number;
//     product: {
//         productId: number;
//         productName: string;
//         categoryId: number;
//     }
// }

interface OrderDetails {
    orderId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
}

function GetOrderDetails() {

    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>();

    const { orderIdParam } = useParams(); 

    useEffect(() => { getOrderDetails(parseInt(orderIdParam ?? '0')) }, []);

    const navigate = useNavigate();

    const handleDelete = async (orderIdParam: number, productIdParam: number) => {

        const response = await fetch(`/api/order/details/${orderIdParam}/${productIdParam}`, { method: 'DELETE' });
        if (response.ok) {
            console.log("SUCCESS delete order detail !!!");
            setOrderDetails(orderDetails?.filter(d => d.productId != productIdParam));
        }
        else
            console.log("ERROR delete order detail !!!");
    }

    const handleEdit = (productId: number) => {
        //F alert(`Handle Edit for student with ID: ${id}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLE
        navigate(`/order/details/update/${orderIdParam}/${productId}`)

    }

    const handleShowProduct = (idFromParam: number) => {
        //F alert(`Handle Edit for student with ID: ${id}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLE
        navigate(`/order/get/${idFromParam}`)

    }

    // const handleEditQueryParam = (queryParamId) => {
    //     // alert(`Handle Edit for student with ID: ${queryParamId}`);

    //     // Trigger navigation to the update page using useNavigate
    //     // USING PATH VARIABLEQueryParam
    //     navigate(`/update?queryParamId=${queryParamId}`);

    // }

    const contents = orderDetails === undefined
        ? <p><em> Loading...Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :<table className="table table-bordered">
            <thead className="thead-dark">
                <tr>
                    {/* <th scope="col">OrderId</th> */}
                    <th scope="col">№</th>
                    <th scope="col">Product</th>
                    <th scope="col">Category</th>
                    <th scope="col">UnitPrice</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.map((detail, index) =>
                    <tr key={index}>
                        { }
                        <td>{index + 1}</td>
                        <td>{detail.productName}</td>
                        <td>{detail.categoryName}</td>
                        <td>{detail.unitPrice}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.discount}</td>
                        <td>
                            <button className="btn btn-warning btn-md mr-2" onClick={() => handleEdit(detail.productId)}>Редактировать</button>
                            <button className="btn btn-danger btn-md" onClick={() => handleDelete(detail.orderId, detail.productId)}>Удалить</button>
                    </td>
                </tr>)}
                </tbody>
            </table>

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="d-flex">
                            <Link className="nav-link " to={`/order/details/add/${orderIdParam}`}>Добавить деталь заказа</Link>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <h2 id="tableLabel">Детали заказа №{orderIdParam}</h2>
                {/* <p>This component demonstrates fetching data from the server.</p> */}
                {contents}
            </div>
        </>
    );


    async function getOrderDetails(orderId: number) {
        console.log(`idFromParam: ${orderId}`);
        const response = await fetch(`/api/order/details/${orderId}`);
        if (response.ok) {
            console.log("SUCCESS get order details !!!");
            const data = await response.json();
            setOrderDetails(data);
        }
        else
            console.log("ERROR get order details !!!");
    }

    // async function getOrders() {
    //     const response = await fetch('/api/order');
    //     if (response.ok) {
    //         console.log("SUCCESS order!!!");
    //         const data = await response.json();
    //         setOrders(data);
    //     }
    //     else
    //         console.log("ERROR order!!!");
    // }

    
}

export default GetOrderDetails;