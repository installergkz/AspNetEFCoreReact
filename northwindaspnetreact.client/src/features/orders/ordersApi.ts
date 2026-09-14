import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Определяем наш API-слайс
export const ordersApi = createApi({
  // Ключ, под которым будет храниться состояние этого API в сторе
  reducerPath: 'ordersApi',
  // Базовая настройка для всех запросов
  baseQuery: fetchBaseQuery({
    // Базовый URL для всех запросов
    baseUrl: '/api/northwind',
  }),
  // Типы тегов для инвалидации кэша
  tagTypes: ['Order'],
  // Конечные точки (endpoints) нашего API
  endpoints: (builder) => ({
    // Эндпоинт для получения всех пользователей
    getOrders: builder.query({
      query: () => '/orders', // Относительный путь к endpoint
      // Указываем, что этот запрос предоставляет данные с тегом 'Order'
        providesTags: ['Order'],
    }),
    // Эндпоинт для получения одного пользователя по ID
    getOrderById: builder.query({
        query: (id) => `/orders/${id}`,
      // Здесь мы используем функцию для точного указания, какие данные предоставляет запрос
        providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    // Эндпоинт для создания нового пользователя (мутация)
    createOrder: builder.mutation({
      query: (newOrder) => ({
            url: '/orders',
        method: 'POST',
            body: newOrder,
      }),
      // Эта мутация инвалидирует тег 'Order', вызывая перезапрос всех запросов, которые зависят от него
        invalidatesTags: ['Order'],
    }),
    // Эндпоинт для обновления заказа
    // updateOrder: builder.mutation({
    //     query: ({ orderId, ...patch }) => ({
    //         // url: `/orders/${orderId}`,
    //         url: `/orders`,
    //     method: 'PUT',
    //     body: patch,
    //     }),
        updateOrder: builder.mutation({
            query: (arg) => ({
                // url: `/orders/${orderId}`,
                url: `/orders`,
                method: 'PUT',
                body: arg,
            }),
      // Точная инвалидация: инвалидируем только конкретный заказ по ИД.
            invalidatesTags: (result, error, arg) => [{ type: 'Order', orderId: arg.orderId }],
    }),
    // Эндпоинт для удаления заказа
    deleteOrder: builder.mutation({
      query: (id: number) => ({
            url: `/orders/${id}`,
        method: 'DELETE',
      }),
      // При удалении инвалидируем весь список, так как он изменился
        invalidatesTags: ['Order'],
    }),

      // Временный эндпоинт для получения ИД покупателей. Потом надо будет сделать свой api.
      getCustomerIds: builder.query({
          query: () => `/orders/getCustomerIds`
      }),

  }),
})

// RTK Query автоматически генерирует хуки для каждого эндпоинта
// Название формируется так: use + ИмяЭндпоинта + Query/Mutation
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetCustomerIdsQuery
} = ordersApi