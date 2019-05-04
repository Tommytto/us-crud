import React, { useEffect } from "react";
import { useModelActions, userModel } from "store/model";
import CRUDContainer from "components/CRUDContainer";

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

async function loadData(url) {
    const response = await fetch(url);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(response.json())
        }, 2000)
    })
}

const fieldConfig = {
    name: {
        type: "text",
        name: 'name',
        label: 'Имя',
        placeholder: 'Введите имя',
    },
    age: {
        name: 'age',
        label: 'Возраст',
        placeholder: 'Введите возраст',
    },
    date: {
        Component: () => {},
    },
    salary: {
        name: 'salary',
        type: "range",
        label: 'Зарплата',
        fieldProps: {
            from: 0,
            to: 90000,
            step: 1000,
        }
    }
};

const UserList = () => {
    const { loadMany, addOne } = useModelActions(userModel);

    useEffect(() => {
        loadMany(loadData("/user.json"), normalizeUser);
    }, []);

    function handleClick() {
        addOne({
            id: Date.now(),
            name: Date.now(),
            age: 0,
            salary: 0,
        })
    }

    return (
        <div>
            {/*<button onClick={handleClick}>Add one</button>*/}
            <CRUDContainer fieldConfig={fieldConfig} model={userModel} />
        </div>
    );
};

export default UserList;
