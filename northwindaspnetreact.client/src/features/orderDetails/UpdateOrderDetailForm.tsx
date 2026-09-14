import { useState } from 'react';
import { useNavigate } from "react-router";
import { useUpdateOrderDetailMutation } from './orderDetailsApi';
import './AddOrder.css';

interface OrderDetail {
    orderId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;
    productName: string;
}

// interface Products {
//     [key: number]: string;
// }

export const UpdateOrderDetailForm = ({ initialData }) => {
    const [orderDetail, setOrderDetail] = useState<OrderDetail>(initialData);

    // Хук для создания пользователя
    const [updateOrderDetail, { isLoading: isUpdating, isSuccess: isSuccessUpdate }] = useUpdateOrderDetailMutation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderDetail(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // Отправляем нового заказа на сервер
            await updateOrderDetail(orderDetail).unwrap();
          // Если мутация успешна, RTK Query автоматически инвалидирует тег 'OrderDetail'
          // Это заставит useGetOrdersQuery в компоненте OrdersList перезапросить данные!

            navigate(`/northwind/orders/details/${orderDetail.orderId}`)
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
                                Обновить деталь заказа
{/*                                 {isError && (<div className="error-message">{error}</div>)} */}
                            </div>
{/*                                 Display form after loading finishes */}
                                <div className="card-body bg-light">

                                {/*     <h2>Новый заказ</h2> */}

                              {/*       {isError && (<div className="error-message">{error}</div>)} */}
              {/*                       {isSuccess && <div className="success-message"> Заказ создан.</div>} */}

                                    <form onSubmit={handleSubmit} className="form-container">
                                        <h2 className="form-heading">Информация о детали заказа</h2>

                                        <div className="form-group">
                                            <label htmlFor="orderId" className="form-label">OrderId:</label>
                                            <input
                                                type="text"
                                                id="orderId"
                                                name="orderId"
                                                value={orderDetail.orderId}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="productId" className="form-label">Product:</label>
                                            <input
                                                type="text"
                                                id="productId"
                                                name="productId"
                                                value={orderDetail.productName || ''}
                                                className="form-input"
                                                readOnly
                                            />
                                        </div>

{/*                                         <div className="form-group">
                                            <label htmlFor="productId" className="form-label">ProductId:</label>
                                            <select name="productId" id="productId" value={orderDetail.productId || 0} onChange={handleSelectChange} readOnly>
                                                <option value="">Выберите продукт</option>
                                                {Object.entries(products).map(([productId, productName]) => <option key={productId} value={productId}>{productName}</option>)}
                                            </select>
                                        </div> */}

                                        <div className="form-group">
                                            <label htmlFor="unitPrice" className="form-label">UnitPrice:</label>
                                            <input
                                                type="number"
                                                id="unitPrice"
                                                name="unitPrice"
                                                value={orderDetail.unitPrice || 0}
                                                onChange={handleChange}
                                                disabled={isUpdating}
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
                                                disabled={isUpdating}
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
                                                disabled={isUpdating}
                                            />
                                        </div>

                                        <div className="form-group form-button">
                                            <button type="submit" className="btn-submit" disabled={isUpdating}>{isUpdating ? 'Сохранение...' : 'Сохранить'}</button>
                                        </div>

                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

};