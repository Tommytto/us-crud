import { createModel } from "model/model";
import { createAction } from "store/utils";
import api from "logic/api";

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

const modelConfig = {
    // handleActionCreator: makeActionCreator,
    asyncActions: {
        createOne: {
            async: api.addUser,
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

export const userModel = createModel({
    ...modelConfig,
    modelName: "user"
});
