import { combineReducers } from "redux";
import { userModel } from "store/model";

const rootReducer = combineReducers({
    user: userModel.getReducer()
});

export default rootReducer;
