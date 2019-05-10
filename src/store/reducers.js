import { combineReducers } from "redux";
import {companyModel, userModel} from "store/model";
import Model from "model_v3/Model";

export const testModel = new Model({modelName: "test"});
console.log(testModel.getReducer());
const rootReducer = combineReducers({
    [userModel.getName()]: userModel.getReducer(),
    test: testModel.getReducer(),
});

export default rootReducer;
