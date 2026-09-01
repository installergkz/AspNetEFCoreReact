import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from './components/Navbar.jsx';
// import StudentCreate from './components/StudentCreate';
// import StudentFetch from './components/StudentFetch';
// import StudentUpdate from './components/StudentUpdate';
// import StudentUpdateQueryParam from './components/StudentUpdateQueryParam';
import CreateOrder from './components/CreateOrder'
import GetOrders from './components/GetOrders'

const NorthwindApp = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h1>Welcome to React CRUD Example</h1>} />
{/*                     <Route path="/create" element={<StudentCreate />} />
                    <Route path="/get-all" element={<StudentFetch />} />
                    <Route path="/update/:idFromParam" element={<StudentUpdate />} />
                    <Route path="/update" element={<StudentUpdateQueryParam />} />
                    <Route path="/" element={<h2>Главная</h2>} /> */}
                    <Route path="/about" element={<h2>О сайте</h2>} />
                    <Route path="/order/get" element={<GetOrders />} />
                    <Route path="/order/add" element={<CreateOrder />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default NorthwindApp;