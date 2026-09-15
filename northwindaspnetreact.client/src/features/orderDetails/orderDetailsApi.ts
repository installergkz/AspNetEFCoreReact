import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface OrderDetail {
    orderId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
}

interface OrderDetailArgs {
    orderId: number;
    productId?: number | null;
};

// хз что лучше - тип или интерфейс.
//interface Products extends Record<string, string> { };
// interface Products {
//     [key: number]: string;
// }
type Products = Record<string, string>;

// Определяем наш API-слайс
export const orderDetailsApi = createApi({
  // Ключ, под которым будет храниться состояние этого API в сторе
  reducerPath: 'orderDetailsApi',
  // Базовая настройка для всех запросов
  baseQuery: fetchBaseQuery({
    // Базовый URL для всех запросов
    baseUrl: '/api/northwind',
  }),
  // Типы тегов для инвалидации кэша
    tagTypes: ['OrderDetail'],
  // Конечные точки (endpoints) нашего API
  endpoints: (builder) => ({
    // // Эндпоинт для получения всех деталей заказа по ИД заказа
    //   getOrderDetailsByOrderId: builder.query<OrderDetail, number>({
    //     query: (orderId) => `/orders/details/${orderId}`, // Относительный путь к endpoint
    //   // Указываем, что этот запрос предоставляет данные с тегом 'OrderDetail'
    //     providesTags: ['OrderDetail'],
      // }),

      // Эндпоинт для получения деталей заказа по ИД заказа и ИД продукта.
      getOrderDetails: builder.query<OrderDetail[], OrderDetailArgs>({
          query: ({ orderId, productId }) => productId ? `/orders/details/${orderId}?productId=${productId}` : `/orders/details/${orderId}`, 
        // Здесь мы используем функцию для точного указания, какие данные предоставляет запрос
        providesTags: (result, error, { orderId, productId }) => [{ type: 'OrderDetail', orderId, productId }],
        //providesTags: (result, error, { orderId, productId }) => [{ type: 'OrderDetail', id: `${orderId}-${productId}` }],
      }),

    // Эндпоинт для создания детали заказа (мутация)
      createOrderDetail: builder.mutation({
      query: (newOrderDetail) => ({
            url: '/orders/details',
            method: 'POST',
            body: newOrderDetail,
          }),

      // Эта мутация инвалидирует тег 'OrderDetail', вызывая перезапрос всех запросов, которые зависят от него
        invalidatesTags: ['OrderDetail'],
      }),

    // Эндпоинт для обновления детали заказа
      // updateOrderDetail: builder.mutation({
      //     query: ({ id, productId, ...patch }) => ({
      //       url: `/orders/details/${id}/${productId}`,
      //       method: 'PUT',
      //       body: patch,
      // }),
      // // Точная инвалидация: инвалидируем только конкретную детадь заказа по ИД заказа и ИД продукта
      //     invalidatesTags: (result, error, { id, productId }) => [{ type: 'OrderDetail', id, productId }],
      updateOrderDetail: builder.mutation({
          query: (arg) => ({
            url: '/orders/details',
            method: 'PUT',
            body: arg,
            }),
      // Точная инвалидация: инвалидируем только конкретную детадь заказа по ИД заказа и ИД продукта
          invalidatesTags: (result, error, arg) => [{ type: 'OrderDetail', orderId: arg.orderId, productId: arg.productId }],
        }),
    // // Эндпоинт для удаления деталей заказа по ИД заказа
    //   deleteOrderDetailsByOrderId: builder.mutation({
    //     query: (orderId) => ({
    //      url: `/orders/details/${orderId}`,
    //      method: 'DELETE',
    //   }),
    //   // При удалении инвалидируем весь список, так как он изменился
    //     invalidatesTags: ['OrderDetail'],
      //   }),

      // Эндпоинт для удаления детали заказа по ИД заказа и ИД продукта
      deleteOrderDetails: builder.mutation({
          query: ({ orderId, productId }) => ({
              url: `/orders/details/${orderId}`,
              method: 'DELETE',
              params: { productId }// Параметры уходят в query string
          }),
          // При удалении инвалидируем весь список, так как он изменился
          invalidatesTags: ['OrderDetail'],
      }),

      // Временный эндпоинт для получения продуктов. Потом надо будет сделать свой api.
      getProducts: builder.query<Products, number | null>({
          query: (productId) => productId ? `/orders/getProducts/${productId}` : `orders/getProducts`
      }),

  }),
})

// RTK Query автоматически генерирует хуки для каждого эндпоинта
// Название формируется так: use + ИмяЭндпоинта + Query/Mutation
export const {
  useGetOrderDetailsQuery,
  useCreateOrderDetailMutation,
  useUpdateOrderDetailMutation,
  useDeleteOrderDetailsMutation,
  useGetProductsQuery,
} = orderDetailsApi