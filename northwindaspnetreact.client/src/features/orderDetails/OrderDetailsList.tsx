import { useNavigate, useParams, Link } from "react-router";
import { useGetOrderDetailsByOrderIdQuery, useDeleteOrderDetailsMutation } from './orderDetailsApi';

interface OrderDetail {
    orderId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
}

export const OrderDetailsList = () => {

    const { orderIdParam } = useParams(); 

  // Используем хук запроса. Он автоматически вызовет запрос при монтировании компонента.
  const {
    data: orderDetails,          // Данные, полученные с сервера (при успешном запросе)
    error,                // Объект ошибки, если запрос провалился
    isLoading,            // true, когда запрос выполняется в первый раз
    isFetching,           // true, когда запрос выполняется (включая повторные)
    isSuccess,            // true, если запрос завершился успешно
    isError,              // true, если запрос завершился ошибкой
      refetch,              // Функция для принудительного повторного запроса
  } = useGetOrderDetailsByOrderIdQuery(orderIdParam);

    const navigate = useNavigate();

  // Хук мутации возвращает массив, где первый элемент - это функция-триггер, а второй - объект с состоянием мутации
    const [deleteOrderDetail, { isLoading: isDeleting }] = useDeleteOrderDetailsMutation();

    const handleEditOrderDetail = (productId: number) => {
        //F alert(`Handle Edit for student with ID: ${id}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLE
        //navigate(`/northwind/orders/details/update/${orderIdParam}/${productId}`)
        navigate(`/northwind/orders/details/update/${orderIdParam}?productId=${productId}`)
    }

    const handleDeleteOrderDetail = async (productId: number) => {
        console.log(orderIdParam, productId);
    try {
      // Вызываем функцию мутации и передаем данные (в данном случае ID)
        await deleteOrderDetail({ orderId: orderIdParam, productId }).unwrap();
      // Благодаря invalidatesTags: ['User'], хук useGetUsersQuery автоматически выполнит повторный запрос!
      // Данные списка пользователей обновятся. Нам не нужно диспатчить никакие экшены.
    } catch (err) {
        console.error('Failed to delete the order detail: ', err);
    }
  };

  // Рендерим состояние загрузки
  if (isLoading) return <div>Загрузка заказов...</div>;
  // Рендерим состояние ошибки
    if (isError) return <div>Ошибка: {error.message}</div>;


    const contents =
        <div>
        <button onClick={refetch} disabled={isFetching}>{isFetching ? 'Обновляем...' : 'Обновить вручную'}</button>
            {isSuccess && orderDetails &&
                (
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                {/* <th scope="col">OrderId</th> */}
                                <th scope="col">№</th>
                                <th scope="col">Product</th>
                                <th scope="col">Category</th>
                                <th scope="col">UnitPrice</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orderDetails.map((detail: OrderDetail, index: number) =>
                                <tr key={index}>
                                    { }
                                    <td>{index + 1}</td>
                                    <td>{detail.productName}</td>
                                    <td>{detail.categoryName}</td>
                                    <td>{detail.unitPrice}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.discount}</td>
                                    <td>
                                        <button className="btn btn-warning btn-md mr-2" onClick={() => handleEditOrderDetail(detail.productId)}>Редактировать</button>
                                        <button className="btn btn-danger btn-md" onClick={() => handleDeleteOrderDetail(detail.productId)} disabled={isDeleting}>Удалить</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                )
            }
            </div>

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="d-flex">
                            <Link className="nav-link " to={`/northwind/orders/details/add/${orderIdParam}`}>Добавить деталь заказа</Link>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <h2 id="tableLabel">Детали заказа №{orderIdParam}</h2>
                {contents}
            </div>
        </>
    );

};