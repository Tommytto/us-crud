class Api {
    defferedRequest(data) {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve(data);
            }, 2000)
        );
    }

    getUsers = () => {
        const users = {
            userList: [
                {
                    id: 1,
                    name: "Semen",
                    age: 22,
                    salary: 150000
                },
                {
                    id: 2,
                    name: "Timur",
                    age: 21,
                    salary: 75000
                },
                {
                    id: 3,
                    name: "Kekus",
                    age: 22,
                    salary: 20000
                }
            ]
        };
        return this.defferedRequest(users);
    }

    addUser = data => {
        return this.defferedRequest({
            ...data,
            id: Date.now()
        });
    };

    updateUser = data => {
        return this.defferedRequest(data);
    };

    deleteUser = data => {
        return this.defferedRequest({ success: true });
    };
}

const api = new Api();

export default api;
