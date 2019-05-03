import React, { useEffect } from "react";
import { useModel, userModel } from "store/model";
import CRUDLayout from "components/CRUDLayout";
import CRUDRow from "components/CRUDRow";
import CRUDList from "components/CRUDList";

const CRUDConfig = {
    Row: CRUDRow,
    List: CRUDList
};

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

const UserList = () => {
    const { addOne, loadMany } = useModel(userModel);

    useEffect(() => {
        loadMany(loadData("/user.json"), normalizeUser);
    }, []);

    function addUser() {
        addOne({
            id: Date.now(),
            name: Date.now() % 10,
            age: Math.round(Math.random() * 20),
            salary: Math.round(Math.random() * 10000)
        });
    }

    return (
        <div>
            <button onClick={addUser}>Add one</button>
            <CRUDLayout model={userModel} config={CRUDConfig} />
        </div>
    );
};

export default UserList;
