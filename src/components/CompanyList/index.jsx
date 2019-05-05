import React, { useEffect } from "react";
import { useModelActions } from "model/hooks";
import CRUDContainer from "components/CRUDContainer";
import { Input } from "antd";
import {companyModel} from "store/model";
import { compose } from "redux";
import { withRouter } from "react-router";

const fieldConfig = {
    name: {
        Component: Input,
        label: "Название компании",
        fieldProps: {
            placeholder: "Введите название",
            name: "name"
        }
    },
    users: {
        Component: Input,
        label: "Количество сотрудником",
        fieldProps: {
            name: "users",
            placeholder: "Введите количество"
        }
    },
    income: {
        Component: Input,
        label: "Прибыль",
        fieldProps: {
            name: "income",
            placeholder: "Введите прибыль"
        }
    }
};

const CompanyList = ({ match }) => {
    const { asyncReadMany } = useModelActions(companyModel);

    useEffect(() => {
        asyncReadMany();
    }, []);

    return (
        <div>
            <CRUDContainer
                basePath={match.path}
                fieldConfig={fieldConfig}
                model={companyModel}
            />
        </div>
    );
};

export default compose(withRouter)(CompanyList);
