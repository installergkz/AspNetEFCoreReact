import { useNavigate, useParams, Link } from "react-router";
import { useGetOrderDetailsQuery, useDeleteOrderDetailsMutation } from './orderDetailsApi';

export const OrderDetailsList = () => {

    const { orderIdParam } = useParams();
    const orderId = Number(orderIdParam);

  // Используем хук запроса. Он автоматически вызовет запрос при монтировании компонента.
  const {
    data: orderDetails,          // Данные, полученные с сервера (при успешном запросе)
    error,                // Объект ошибки, если запрос провалился
    isLoading,            // true, когда запрос выполняется в первый раз
    isFetching,           // true, когда запрос выполняется (включая повторные)
    isSuccess,            // true, если запрос завершился успешно
    isError,              // true, если запрос завершился ошибкой
      refetch,              // Функция для принудительного повторного запроса
  } = useGetOrderDetailsQuery({ orderId, productId: null });

    const navigate = useNavigate();

  // Хук мутации возвращает массив, где первый элемент - это функция-триггер, а второй - объект с состоянием мутации
    const [deleteOrderDetail, { isLoading: isDeleting }] = useDeleteOrderDetailsMutation();

    const handleEditOrderDetail = (productId: number) => {
        navigate(`/northwind/orders/details/update/${orderId}?productId=${productId}`)
    }

    const handleDeleteOrderDetail = async (productId: number) => {
    try {
      // Вызываем функцию мутации и передаем данные (в данном случае ID)
        await deleteOrderDetail({ orderId, productId }).unwrap();
      // Благодаря invalidatesTags: ['OrderDetail'], хук useGetOrderDetailsQuery автоматически выполнит повторный запрос!
      // Данные списка пользователей обновятся. Нам не нужно диспатчить никакие экшены.
    } catch (err) {
        console.error('Failed to delete the order detail: ', err);
    }
  };

  // Рендерим состояние загрузки
  if (isLoading) return <div>Загрузка заказов...</div>;
  // Рендерим состояние ошибки
  if (isError) return <div>Ошибка: {error && 'message' in error ? error.message : ''}</div>;


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
                        {orderDetails.map((detail, index: number) =>
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
                            <Link className="nav-link " to={`/northwind/orders/details/add/${orderId}`}>Добавить деталь заказа</Link>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <h2 id="tableLabel">Детали заказа №{orderId}</h2>
                {contents}
            </div>
        </>
    );

};