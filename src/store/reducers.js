import { combineReducers } from "redux";
import {companyModel, userModel} from "store/model";

const rootReducer = combineReducers({
    [userModel.getName()]: userModel.getReducer(),
    [companyModel.getName()]: companyModel.getReducer()
});

export default rootReducer;
