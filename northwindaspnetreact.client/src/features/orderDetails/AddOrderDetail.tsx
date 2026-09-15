import { useState } from 'react';
import { useNavigate, useParams, } from "react-router";
import { useCreateOrderDetailMutation, useGetProductsQuery } from './orderDetailsApi';
import type { OrderDetail } from './orderDetailsApi';
import '../orders/AddOrder.css';

// interface Products {
//     [key: number]: string;
// }

export const AddOrderDetail = () => {

    const navigate = useNavigate();
    const { orderIdParam } = useParams();
    const [orderDetail, setOrderDetail] = useState<Partial<OrderDetail>>({ orderId: parseInt(orderIdParam || '0') });

    const {
        data: products,          // Данные, полученные с сервера (при успешном запросе)
        error: productsError,                // Объект ошибки, если запрос провалился
        //isLoading,            // true, когда запрос выполняется в первый раз
        //isFetching,           // true, когда запрос выполняется (включая повторные)
        isSuccess: isSuccessProducts,            // true, если запрос завершился успешно
        isError: isProductsError,              // true, если запрос завершился ошибкой
        //refetch,              // Функция для принудительного повторного запроса
    } = useGetProductsQuery(null);

  // Хук для создания пользователя
    const [createOrderDetail, { isLoading, isSuccess }] = useCreateOrderDetailMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderDetail(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrderDetail(prevState => ({ ...prevState, [name]: value }))
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // Отправляем нового заказа на сервер
            await createOrderDetail(orderDetail).unwrap();
          // Если мутация успешна, RTK Query автоматически инвалидирует тег 'Order'
          // Это заставит useGetOrdersQuery в компоненте OrdersList перезапросить данные!

          // Очищаем форму
            setOrderDetail({});
            navigate(`/northwind/orders/details/${orderIdParam}`)
        } catch (error) {
          console.error('Ошибка при создании детали заказа:', error);
        }
  };

    return (
        <>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                Создать деталь заказа
{/*                                 {isError && (<div className="error-message">{error}</div>)} */}
                            </div>
                            {isSuccessProducts && products &&
                                (
                                // Display form after loading finishes
                                <div className="card-body bg-light">

                                {/*     <h2>Новый заказ</h2> */}

                              {/*       {isError && (<div className="error-message">{error}</div>)} */}
                                    {isSuccess && <div className="success-message"> Заказ создан.</div>}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о детали заказа</h2>

                                        <div className="form-group">
                                            <label htmlFor="orderId" className="form-label">OrderId:</label>
                                            <input
                                                type="text"
                                                id="orderId"
                                                name="orderId"
                                                value={orderIdParam}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="productId" className="form-label">ProductId:</label>
                                            <select name="productId" id="productId" value={orderDetail.productId || 0} onChange={handleSelectChange}>
                                                <option value="">Выберите продукт</option>
                                                {Object.entries(products).map(([productId, productName]) => <option key={productId} value={productId}>{productName}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="unitPrice" className="form-label">UnitPrice:</label>
                                            <input
                                                type="number"
                                                id="unitPrice"
                                                name="unitPrice"
                                                value={orderDetail.unitPrice || 0}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="quantity" className="form-label">Quantity:</label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                value={orderDetail.quantity || 0}
                                                onChange={handleChange}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="discount" className="form-label">Discount:</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="1"
                                                id="discount"
                                                name="discount"
                                                value={orderDetail.discount || 0}
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