import { useState } from 'react';
import { useNavigate } from "react-router";
import { useCreateOrderMutation, useGetCustomerIdsQuery } from './ordersApi';
import './AddOrder.css';

interface Order {
    customerId: string;
    employeeId: number;
    orderDate: string | null;
    shipVia: number;
}

export const AddOrder = () => {

    const [order, setOrder] = useState<Partial<Order>>({});
    const navigate = useNavigate();

    const {
        data: customerIds,          // Данные, полученные с сервера (при успешном запросе)
        error,                // Объект ошибки, если запрос провалился
        //isLoading,            // true, когда запрос выполняется в первый раз
        //isFetching,           // true, когда запрос выполняется (включая повторные)
        isSuccess: isSuccessCustomers,            // true, если запрос завершился успешно
        isError,              // true, если запрос завершился ошибкой
        //refetch,              // Функция для принудительного повторного запроса
    } = useGetCustomerIdsQuery(/* можно передать параметры, если эндпоинт их требует */);

  // Хук для создания пользователя
    const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();

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
    // if (!name.trim() || !email.trim()) return;

    try {
      // Отправляем нового заказа на сервер
        await createOrder(order).unwrap();
      // Если мутация успешна, RTK Query автоматически инвалидирует тег 'Order'
      // Это заставит useGetOrdersQuery в компоненте OrdersList перезапросить данные!

      // Очищаем форму
        setOrder({});
        navigate('/northwind/orders')
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
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
                            {isSuccessCustomers && customerIds &&
                                (
                                // Display form after loading finishes
                                <div className="card-body bg-light">

                                    <h2>Новый заказ</h2>

                                    {isError && (<div className="error-message">{error}</div>)}
                                    {isSuccess && <div className="success-message"> Заказ создан.</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о заказе</h2>

                                        <div className="form-group">
                                            <label htmlFor="customerId" className="form-label">CustomerId:</label>
                                            <select name="customerId" id="customerId" value={order.customerId || ''} onChange={handleSelectChange} required>
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
                                             />
                                        </div>

                                        <div className="form-group form-button">
                                            <button type="submit" className="btn-submit" disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
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