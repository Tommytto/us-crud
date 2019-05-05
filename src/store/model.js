import { createModel } from "model/model";
import { createAction } from "store/utils";
import api from "logic/api";
import {getModel} from "model_v2";

function makeActionCreator(description) {
    return createAction(description);
}

function normalizeUser(data) {
    return data.userList.reduce(
        (result, user) => {
            return {
                list: [...result.list, user.id],
                data: { ...result.data, [user.id]: user }
            };
        },
        { list: [], data: {} }
    );
}

function normalizeCompany(data) {
    return data.companyList.reduce(
        (result, user) => {
            return {
                list: [...result.list, user.id],
                data: { ...result.data, [user.id]: user }
            };
        },
        { list: [], data: {} }
    );
}

const modelConfig = {
    // handleActionCreator: makeActionCreator,
    asyncActions: {
        createOne: {
            async: api.addUser
        },
        updateOne: {
            async: api.updateUser
        },
        deleteOne: {
            async: api.deleteUser
        },
        readMany: {
            async: api.getUsers,
            normalizer: normalizeUser
        }
    }
};

export const userModel = getModel({
    ...modelConfig,
    modelName: "user"
});

export const companyModel = getModel({
    asyncActions: {
        createOne: {
            async: api.addCompany
        },
        updateOne: {
            async: api.updateCompany
        },
        deleteOne: {
            async: api.deleteCompany
        },
        readMany: {
            async: api.getCompanyList,
            normalizer: normalizeCompany
        }
    },
    modelName: "company"
});
