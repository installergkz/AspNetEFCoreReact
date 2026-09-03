import { useEffect, useState } from "react";
import { useParams} from "react-router";
import './CreateOrder.css';

interface Order {
    orderId: number,
    customerId: string,
    employeeId: number,
    orderDate: string | null,
    shipVia: number,
}

const UpdateOrder = () => {

    // const [isLoading, setIsLoading] = useState(true);  // Track the loading state

    const { idFromParam } = useParams(); // Destructure the 'id' from the returned object

    const [oldOrder, setOldOrder] = useState<Partial<Order>>({});

//     const [oldOrder, setOldOrder] = useState<Order>({
//         orderId: 0,
//         customerId: '',
//         employeeId: 0,
//         orderDate: new Date().toISOString(),
//         shipVia: 0
// });

    const [customerIds, setCustomerIds] = useState([]);

    

    //console.log(`idFromParam: ${idFromParam}`); 

    //const navigate = useNavigate(); // Declare useNavigate inside the component

    // let [state, setState] = useState({
    //     student: {
    //         id: '',
    //         name: '',
    //         emailid: '',
    //         mobilenumber: ''
    //     },
    //     responseOfBackend: ''
    // });

    // const [formData, setFormData] = useState<FormData>({
    //     customerId: '',
    //     employeeId: 0,
    //     orderDate: new Date().toISOString(),
    //     shipVia: 0,
    // });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => { getOrder(parseInt(idFromParam ?? '0')) }, []);
    useEffect(() => { getCustomerIds() }, []);

    // const updateStudent2 = (event) => {
    //     event.preventDefault(); // for stopping page refresh
    //     console.log("inserted data is :: " + state.student.emailid);
    //     Axios.put(baseUrl + '/update-Student', state.student)
    //         .then(response => {
    //             console.log(response);
    //             setState(prevState => ({
    //                 ...prevState,
    //                 responseOfBackend: response.data
    //             }));
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })
    // };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(oldOrder)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            //await response.json();
            console.log('Заказ обновлен');
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOldOrder(prevState => ( {...prevState, [name]: value } ))
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOldOrder(prevState => ( {...prevState, [name]: value } ))
    };

//     let { id, name, emailid, mobilenumber } = state.student;

    return (
        <>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                Редактировть
                            </div>
                            {
                                // Display form after loading finishes
                                <div className="card-body bg-light">
                                    {/* <span className="bg-dark text-white text-center">{state.responseData}</span> */}
                                    {/* <br /> */}

                                    <h2>Заказ</h2>

                                    {error && <div className="error-message">{error}</div>}
                                    {success && <div className="success-message"> Заказ обновлен.</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о заказе</h2>

                                        <div className="form-group">
                                            <label htmlFor="orderId" className="form-label">OrderId:</label>
                                            <input
                                                type="text"
                                                id="orderId"
                                                name="orderId"
                                                value={oldOrder.orderId || 0}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="customerId" className="form-label">CustomerId:</label>
                                            <select name="customerId" id="customerId" value={oldOrder.customerId || ''} onChange={handleSelectChange}>
{/*                                                 <option defaultValue={oldOrder.customerId} disabled selected>Выберите заказчика</option> */}
                                                {customerIds.map(customerId => <option key={customerId} value={customerId}>{customerId}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="employeeId" className="form-label">EmployeeId:</label>
                                            <input
                                                type="number"
                                                id="employeeId"
                                                name="employeeId"
                                                value={oldOrder.employeeId || 0}
                                                onChange={handleChange}
                                                disabled={loading}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="orderDate" className="form-label">OrderDate:</label>
                                            <input
                                                type="date"
                                                id="orderDate"
                                                name="orderDate"
                                                value={oldOrder.orderDate?.toString().slice(0, 10) || ''}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shipVia" className="form-label">ShipVia:</label>
                                            <input
                                                type="number"
                                                id="shipVia"
                                                name="shipVia"
                                                value={oldOrder.shipVia || 0}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                                className="form-input"
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

    async function getOrder(id: number) {
        console.log(`idFromParam: ${id}`);
        const response = await fetch(`/api/order/${id}`);
        if (response.ok) {
            console.log("SUCCESS get order!!!");
            const data = await response.json();
            setOldOrder(data);
        }
        else
            console.log("ERROR get order!!!");
    }

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

}

export default UpdateOrder;