import { Link } from "react-router";
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand fw-bold " to="/">React CRUD OPERATION WITH BOOT Example</Link>
                    <div className="d-flex">
                        <Link className="nav-link " to="order/add">Создать заказ</Link>&nbsp;&nbsp;&nbsp;
                        { }
                        <Link className="nav-link " to="order/get">Заказы</Link>&nbsp;&nbsp;&nbsp;
                       
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
