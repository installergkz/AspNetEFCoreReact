import { configureStore } from '@reduxjs/toolkit'

// Импортируем редьюсер из нашего API slice
import { ordersApi } from '../features/orders/ordersApi'
import { orderDetailsApi } from '../features/orderDetails/orderDetailsApi'

// Создаем и экспортируем хранилище
export const store = configureStore({
  // Поле `reducer` ожидает объект, где ключи - это имена частей состояния,
  // а значения - редьюсеры, управляющие этими частями.
  reducer: {
    // Добавляем редьюсер от RTK Query.
    // Ключ 'usersApi' должен совпадать с reducerPath, который мы указали в createApi.
        [ordersApi.reducerPath]: ordersApi.reducer,
        [orderDetailsApi.reducerPath]: orderDetailsApi.reducer
  },
  // Добавляем middleware от RTK Query для работы с кэшированием, инвалидацией и т.д.
  // Это обязательный шаг!
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(ordersApi.middleware)
            .concat(orderDetailsApi.middleware)
});

