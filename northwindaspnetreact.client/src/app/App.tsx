import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from '../features/navbar/Navbar.js'
import { OrdersList } from '../features/orders/OrdersList'
import { AddOrder } from '../features/orders/AddOrder'
import { UpdateOrder } from '../features/orders/UpdateOrder'
import { OrderDetailsList } from '../features/orderDetails/OrderDetailsList'
import { AddOrderDetail } from '../features/orderDetails/AddOrderDetail'
import { UpdateOrderDetail } from '../features/orderDetails/UpdateOrderDetail'
import './App.css'

export const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/northwind" element={<h1>Northwind shop</h1>} />
                    <Route path="/northwind/about" element={<h2>О сайте</h2>} />
                    <Route path="/northwind/orders" element={<OrdersList />} />
                    <Route path="/northwind/orders/details/:orderIdParam" element={<OrderDetailsList />} />
                    <Route path="/northwind/orders/add" element={<AddOrder />} />
                    <Route path="/northwind/orders/details/add/:orderIdParam" element={<AddOrderDetail />} />
                    <Route path="/northwind/orders/update/:orderIdParam" element={<UpdateOrder />} />
                    <Route path="/northwind/orders/details/update/:orderIdParam" element={<UpdateOrderDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
