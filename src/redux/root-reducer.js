//actual base object represent all the state in application
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})