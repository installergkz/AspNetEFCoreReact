import { useParams } from "react-router";
import { useGetOrderByIdQuery } from './ordersApi';
import { UpdateOrderForm } from './UpdateOrderForm'

export const UpdateOrder = () => {
    const { orderIdParam } = useParams();
    const orderId = Number(orderIdParam);

    const {
        data: order,          // Данные, полученные с сервера (при успешном запросе)
        isLoading: isOrderLoading,            // true, когда запрос выполняется в первый раз
        // error: orderError,                // Объект ошибки, если запрос провалился
        // isFetching: isOrderFetching,           // true, когда запрос выполняется (включая повторные)
        // isSuccess: isOrderSuccess,            // true, если запрос завершился успешно
        // isError: isOrderError,              // true, если запрос завершился ошибкой
        // refetch,              // Функция для принудительного повторного запроса
    } = useGetOrderByIdQuery(orderId);

    if (isOrderLoading || !order) return <p>Загрузка...</p>;

    return <UpdateOrderForm key={orderId} initialData={order} />;
};