import { useNavigate, Link } from "react-router";
import { useGetOrdersQuery, useDeleteOrderMutation, } from './ordersApi';

interface Order {
    orderId: number;
    customerId: string;
    employeeId: number;
    orderDate: string;
}

export const OrdersList =() => {
    
  // Используем хук запроса. Он автоматически вызовет запрос при монтировании компонента.
  const {
    data: orders,          // Данные, полученные с сервера (при успешном запросе)
    error,                // Объект ошибки, если запрос провалился
    isLoading,            // true, когда запрос выполняется в первый раз
    isFetching,           // true, когда запрос выполняется (включая повторные)
    isSuccess,            // true, если запрос завершился успешно
    isError,              // true, если запрос завершился ошибкой
      refetch,              // Функция для принудительного повторного запроса
  } = useGetOrdersQuery(/* можно передать параметры, если эндпоинт их требует */);

    const navigate = useNavigate();

    // Хук мутации возвращает массив, где первый элемент - это функция-триггер, а второй - объект с состоянием мутации
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    // const handleEditOrder = (orderIdParam: number) => {
    //     navigate(`/northwind/orders/update/${orderIdParam}`)
    // }

    const handleEditOrder = (orderId: number) => {
        navigate(`/northwind/orders/update/${orderId}`)
    }

    const handleShowDetails = (orderId: number) => {
        navigate(`/northwind/orders/details/${orderId}`)
    }

    const handleDeleteOrder = async (orderId: number) => {
    try {
      // Вызываем функцию мутации и передаем данные (в данном случае ID)
        await deleteOrder(orderId).unwrap();
      // Благодаря invalidatesTags: ['Order'], хук useGetOrdersQuery автоматически выполнит повторный запрос!
      // Данные списка пользователей обновятся. Нам не нужно диспатчить никакие экшены.
    } catch (error) {
        console.error('Failed to delete the order: ', error);
    }
  };

  // Рендерим состояние загрузки
  if (isLoading) return <div>Загрузка заказов...</div>;
  // Рендерим состояние ошибки
    if (isError) return <div>Ошибка: {error.message}</div>;

    const contents = <div>
        <h2>Список заказов</h2>
        <button onClick={refetch} disabled={isFetching}>{isFetching ? 'Обновляем...' : 'Обновить вручную'}</button>  
            {isSuccess && orders &&
            (
                <div>
                    <h2 id="tableLabel">Заказы</h2>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">CustomerId</th>
                                <th scope="col">EmployeeId</th>
                                <th scope="col">OrderDate</th>
                                <th scope="col">Details</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: Order) =>
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.customerId}</td>
                                    <td>{order.employeeId}</td>
                                    <td>{order.orderDate}</td>
                                    <td>
                                        <button className="btn btn-success btn-md mr-2" onClick={() => handleShowDetails(order.orderId)}>Показать детали</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning btn-md mr-2" onClick={() => handleEditOrder(order.orderId)}>Редактировать</button>
                                        <button className="btn btn-danger btn-md" onClick={() => handleDeleteOrder(order.orderId)} disabled={isDeleting}>Удалить</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                )
        }
    </div>

    return (<>
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div className="d-flex">
                        <Link className="nav-link" to="/northwind/orders/add/">Создать заказ</Link>&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
            </nav>
        </div>
        {contents}
    </>);

};