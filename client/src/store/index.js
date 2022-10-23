import { configureStore } from '@reduxjs/toolkit'
import authReduser from './auth.js'

export default configureStore({
  reducer: {
    auth: authReduser,
  },
})