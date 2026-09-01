import { useState, useEffect } from 'react';
import './CreateOrder.css';

interface FormData {
    customerId: string,
    employeeId: number,
    orderDate: string | null,
    shipVia: 0,
}

const CreateOrder = () => {
    const [formData, setFormData] = useState<FormData>({
        customerId: '',
        employeeId: 0,
        orderDate: new Date().toISOString(),
        shipVia: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [customerIds, setCustomerIds] = useState([]);

    useEffect(() => {
        getCustomerIds();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
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
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Заказ создан:', data);
            setSuccess(true);
            setFormData({ customerId: '', employeeId: 0, orderDate: new Date().toISOString(), shipVia: 0 });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div className="form-container">
    //         <h2>Новый заказ</h2>

    //         {error && <div className="error-message">{error}</div>}
    //         {success && <div className="success-message"> Заказ создан.</div>}

    //         <form onSubmit={handleSubmit}>

    //             <div className="form-group">
    //                 <label htmlFor="customerId">CustomerId:</label>
    //                 <select name="customerId" value={formData.customerId} onChange={handleChange}>
    //                     <option value="">Select customerId</option>
    //                     {customerIds.map(customerId => <option key={customerId} value={customerId}>{customerId}</option>)}
    //                 </select>
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="employeeId">EmployeeId:</label>
    //                 <input
    //                     type="number"
    //                     id="employeeId"
    //                     name="employeeId"
    //                     value={formData.employeeId}
    //                     onChange={handleChange}
    //                     disabled={loading}
    //                 />
    //             </div>

    //             <div className="form-group">
    //                 <label htmlFor="shipVia">ShipVia:</label>
    //                 <input
    //                     type="number"
    //                     id="shipVia"
    //                     name="shipVia"
    //                     value={formData.shipVia}
    //                     onChange={handleChange}
    //                     required
    //                     disabled={loading}
    //                 />
    //             </div>

    //             <button type="submit" disabled={loading}>
    //                 {loading ? 'Adding...' : 'Add Item'}
    //             </button>
    //         </form>
    //     </div>
    // );

    // const styles = {
    //     container: {
    //         display: "flex",
    //         justifyContent: "center",  // Centers the content horizontally
    //         alignItems: "center",      // Centers the content vertically
    //         height: "100vh",           // Full viewport height
    //         textAlign: "center"        // Centers the text inside the div
    //     }
    // };

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
                                            <select name="customerId" id="customerId" value={formData.customerId} onChange={handleChange}>
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
                                                value={formData.employeeId}
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
                                                value={formData.orderDate?.toString()}
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
                                                value={formData.shipVia}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-group form-button">
                                            <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Adding...' : 'Add Item'}</button>
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