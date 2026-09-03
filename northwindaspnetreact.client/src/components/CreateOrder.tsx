import { useState, useEffect } from 'react';
import './CreateOrder.css';

interface Order {
    customerId: string;
    employeeId: number;
    orderDate: string | null;
    shipVia: number;
}

const CreateOrder = () => {

    // const [order, setOrder] = useState<Order>({
    //     customerId: '',
    //     employeeId: 0,
    //     orderDate: new Date().toISOString(),
    //     shipVia: 0,
    // });

    const [order, setOrder] = useState<Partial<Order>>({});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [customerIds, setCustomerIds] = useState([]);

    useEffect(() => {
        getCustomerIds();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prevState => ({ ...prevState, [name]: value }))
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer your-token-here'
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Заказ создан:', data);
            setSuccess(true);
            setOrder({ customerId: '', employeeId: 0, orderDate: new Date().toISOString(), shipVia: 0 });
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
                                Создать новый заказ
                            </div>
                            {
                                // Display form after loading finishes
                                <div className="card-body bg-light">
                                    {/* <span className="bg-dark text-white text-center">{state.responseData}</span> */}
                                    {/* <br /> */}

                                    <h2>Новый заказ</h2>

                                    {error && <div className="error-message">{error}</div>}
                                    {success && <div className="success-message"> Заказ создан.</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о заказе</h2>

                                        <div className="form-group">
                                            <label htmlFor="customerId" className="form-label">CustomerId:</label>
                                            <select name="customerId" id="customerId" value={order.customerId || ''} onChange={handleSelectChange}>
                                                <option value="">Выберите заказчика</option>
                                                {customerIds.map(customerId => <option key={customerId} value={customerId}>{customerId}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="employeeId" className="form-label">EmployeeId:</label>
                                            <input
                                                type="number"
                                                id="employeeId"
                                                name="employeeId"
                                                value={order.employeeId || 0}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="orderDate" className="form-label">OrderDate:</label>
                                            <input
                                                type="date"
                                                id="orderDate"
                                                name="orderDate"
                                                value={order.orderDate?.toString().slice(0, 10) || ''}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shipVia" className="form-label">ShipVia:</label>
                                            <input
                                                type="number"
                                                id="shipVia"
                                                name="shipVia"
                                                value={order.shipVia || 0}
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

    async function getCustomerIds() {
        console.log("getCustomerIds start");
        const response = await fetch('/api/order/GetCustomerIds');
        if (response.ok) {
            console.log("SUCCESS getCustomerIds");
            const data = await response.json();
            setCustomerIds(data);
        }
        else
            console.log("ERROR getCustomerIds");
    }
};

export default CreateOrder;