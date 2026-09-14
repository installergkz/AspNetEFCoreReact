import { useParams, useSearchParams } from "react-router";
import { useGetOrderDetailByOrderIdAndProductIdQuery } from './orderDetailsApi';
import { UpdateOrderDetailForm } from './UpdateOrderDetailForm';

export const UpdateOrderDetail = () => {
    const { orderIdParam } = useParams();
    const [searchParams] = useSearchParams();
    const orderId = Number(orderIdParam); 
    const productId = Number(searchParams.get('productId')); 
    const skip = !orderId || !productId;

    const {
        data: oldOrderDetails,          // Данные, полученные с сервера (при успешном запросе)
        isLoading: isOldOrderDetailLoading,            // true, когда запрос выполняется в первый раз
        // error: oldOrderDetailError,                // Объект ошибки, если запрос провалился
        // isFetching: isOldOrderDetailFetching,           // true, когда запрос выполняется (включая повторные)
        // isSuccess: isOldOrderDetailSuccess,            // true, если запрос завершился успешно
        // isError: isOldOrderDetailError,              // true, если запрос завершился ошибкой
        // //refetch,              // Функция для принудительного повторного запроса
    } = useGetOrderDetailByOrderIdAndProductIdQuery({ orderId, productId }, { skip });
    //} = useGetOrderDetailByOrderIdAndProductIdQuery({ orderId: parseInt(orderIdParam || '0'), productId: productIdParam, productName: '' }, { skip });

    if (isOldOrderDetailLoading || !oldOrderDetails)
        return <p>Загрузка...</p>;

    return <UpdateOrderDetailForm key={productId} initialData={oldOrderDetails[0]} />
};