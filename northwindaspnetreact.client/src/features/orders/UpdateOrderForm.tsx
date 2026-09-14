import { useState } from 'react';
import { useNavigate } from "react-router";
import { useUpdateOrderMutation, useGetCustomerIdsQuery } from './ordersApi';
import './AddOrder.css';

interface Order {
    orderId: number;
    customerId: string;
    employeeId: number;
    orderDate: string | null;
    shipVia: number;
}

export const UpdateOrderForm = ({ initialData }) => {

    const [order, setOrder] = useState<Order>(initialData);

    const {
        data: customerIds,          // Данные, полученные с сервера (при успешном запросе)
        error: customersError,                // Объект ошибки, если запрос провалился
        //isLoading,            // true, когда запрос выполняется в первый раз
        //isFetching,           // true, когда запрос выполняется (включая повторные)
        isSuccess: isCustomersSuccess,            // true, если запрос завершился успешно
        isError: isCustomersError,              // true, если запрос завершился ошибкой
        //refetch,              // Функция для принудительного повторного запроса
    } = useGetCustomerIdsQuery(/* можно передать параметры, если эндпоинт их требует */);

    // Хук для создания пользователя
    const [updateOrder, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateOrderMutation();
    const navigate = useNavigate();

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
        try {
          // Отправляем нового заказа на сервер
          await updateOrder(order).unwrap();
          // Если мутация успешна, RTK Query автоматически инвалидирует тег 'Order'
          // Это заставит useGetOrdersQuery в компоненте OrdersList перезапросить данные!

            // При вызове useNavigate омпонент размонтируется. Сбрасывать состояние перед размонтированием не нужно — React сам его выбросит.
            navigate('/northwind/orders')
        
        } catch (error) {
          console.error('Ошибка при обновлении заказа:', error);
        }
    };

    return (
        <>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                Редактировть
                            </div>
                            {isCustomersSuccess && 
                                (
                                // Display form after loading finishes
                                <div className="card-body bg-light">

                                    <h2>Заказ</h2>

                                    { }
                                    {isUpdateSuccess && <div className="success-message"> Заказ создан.</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о заказе</h2>

                                        <div className="form-group">
                                            <label htmlFor="orderId" className="form-label">OrderId:</label>
                                            <input
                                                type="text"
                                                id="orderId"
                                                name="orderId"
                                                value={order.orderId || 0}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="customerId" className="form-label">CustomerId:</label>
                                            <select name="customerId" id="customerId" value={order.customerId || ''} onChange={handleSelectChange} required disabled={isUpdating}>
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
                                                disabled={isUpdating}
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
                                                disabled={isUpdating}
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
                                                disabled={isUpdating}
                                             />
                                        </div>

                                        <div className="form-group form-button">
                                            <button type="submit" className="btn-submit" disabled={isUpdating}>{isUpdating ? 'Сохранение...' : 'Сохранить'}</button>
                                        </div>

                                    </form>
                                </div>
                                )
                               }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

};