import { useState, useEffect } from 'react';
import { useNavigate, useParams, } from "react-router";
import './CreateOrder.css';
import './Navbar.css';

interface OrderDetail {
    orderId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;
}
// interface Product {
//     id: number;
//     name: string;
// }

interface Products {
    [key: number]: string;
}

// interface Product extends Record<number, string> { }

const CreateOrderDetail = () => {

    const navigate = useNavigate();
    const { orderIdParam } = useParams();
    const [products, setProducts] = useState<Products>([]);
    const [orderDetail, setOrderDetail] = useState<Partial<OrderDetail>>({ orderId: parseInt(orderIdParam || '0') });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    //console.log('products123:', products);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderDetail(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrderDetail(prevState => ({ ...prevState, [name]: value }))
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/order/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer your-token-here'
                },
                body: JSON.stringify(orderDetail)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Деталь заказа создана:', data);
            setSuccess(true);
            //setOrderDetail({ orderId: 0, productId: 0, unitPrice: 0, quantity: 0, discount: 0 });
            setOrderDetail(prevState => ({ ...prevState, orderId: 0, productId: 0, unitPrice: 0, quantity: 0, discount: 0 }));
            navigate(`/order/getDetails/${orderIdParam}`)
        } catch (err ) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                Создать деталь заказа
                            </div>
                            {
                                // Display form after loading finishes
                                <div className="card-body bg-light">
                                    {/* <span className="bg-dark text-white text-center">{state.responseData}</span> */}
                                    {/* <br /> */}

                               {/*      <h2>Новый заказ</h2> */}

                                    {error && <div className="error-message">{error}</div>}
                                    {success && <div className="success-message">Деталь заказ создана</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о детали заказа</h2>

                                        <div className="form-group">
                                            <label htmlFor="orderId" className="form-label">OrderId:</label>
                                            <input
                                                type="text"
                                                id="orderId"
                                                name="orderId"
                                                value={orderIdParam}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="productId" className="form-label">ProductId:</label>
                                            <select name="productId" id="productId" value={orderDetail.productId || 0} onChange={handleSelectChange}>
                                                <option value="">Выберите продукт</option>
                                                {Object.entries(products).map(([productId, productName]) => <option key={productId} value={productId}>{productName}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="unitPrice" className="form-label">UnitPrice:</label>
                                            <input
                                                type="number"
                                                id="unitPrice"
                                                name="unitPrice"
                                                value={orderDetail.unitPrice || 0}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="quantity" className="form-label">Quantity:</label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={orderDetail.quantity || 0}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="discount" className="form-label">Discount:</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="1"
                                                id="discount"
                                                name="discount"
                                                value={orderDetail.discount || 0}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group form-button">
                                            <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Сохранение...' : 'Сохранить'}</button>
                                        </div>

                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

    async function getProducts() {
        console.log("GetProducts start");
        const response = await fetch('/api/order/GetProducts');
        if (response.ok) {
            console.log("SUCCESS GetProducts");
            const data = await response.json();
            //const product = JSON.parse(data) as Product;
            setProducts(data);
        }
        else
            console.log("ERROR GetProducts");
    }
};

export default CreateOrderDetail;