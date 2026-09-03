import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from './components/Navbar.jsx';
// import StudentCreate from './components/StudentCreate';
// import StudentFetch from './components/StudentFetch';
// import StudentUpdate from './components/StudentUpdate';
// import StudentUpdateQueryParam from './components/StudentUpdateQueryParam';
import GetOrders from './components/GetOrders'
import GetOrderDetails from './components/GetOrderDetails'
import CreateOrder from './components/CreateOrder'
import CreateOrderDetail from './components/CreateOrderDetail'
import UpdateOrder from './components/UpdateOrder'
import UpdateOrderDetail from './components/UpdateOrderDetail'


const NorthwindApp = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h1>Northwind shop</h1>} />
{/*                     <Route path="/create" element={<StudentCreate />} />
                    <Route path="/get-all" element={<StudentFetch />} />
                    <Route path="/update/:idFromParam" element={<StudentUpdate />} />
                    <Route path="/update" element={<StudentUpdateQueryParam />} />
                    <Route path="/" element={<h2>Главная</h2>} /> */}
                    <Route path="/about" element={<h2>О сайте</h2>} />
                    <Route path="/order/get" element={<GetOrders />} />
                    <Route path="/order/getDetails/:orderIdParam" element={<GetOrderDetails />} />
                    <Route path="/order/add" element={<CreateOrder />} />
                    <Route path="/order/details/add/:orderIdParam" element={<CreateOrderDetail />} />
                    <Route path="/order/update/:idFromParam" element={<UpdateOrder />} />
                    <Route path="/order/details/update/:orderIdParam/:productIdParam" element={<UpdateOrderDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default NorthwindApp;