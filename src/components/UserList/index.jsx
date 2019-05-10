import React, { useEffect } from "react";
import CRUDContainer from "components/CRUDContainer";
import { Input } from "antd";
import { userModel } from "store/model";
import { compose } from "redux";
import { withRouter } from "react-router";
import api from "logic/api";
import {testModel} from "store/reducers";
import {useModelActions} from "model_v3/hooks/use-model-actions";

const fieldConfig = {
    name: {
        Component: Input,
        label: "Имя",
        fieldProps: {
            placeholder: "Введите имя",
            name: "name"
        }
    },
    age: {
        Component: Input,
        label: "Возраст",
        fieldProps: {
            name: "age",
            placeholder: "Введите возраст"
        }
    },
    salary: {
        Component: Input,
        label: "Зарплата",
        fieldProps: {
            name: "salary",
            placeholder: "Введите зарплату"
        }
    }
};

const UserList = ({ match }) => {
    // const { asyncReadMany } = useModelActions(testModel);

    // useEffect(() => {
    //     asyncReadMany();
    // }, []);

    return (
        <div>
            <CRUDContainer
                basePath={match.path}
                fieldConfig={fieldConfig}
                model={testModel}
            />
        </div>
    );
};

export default compose(withRouter)(UserList);
