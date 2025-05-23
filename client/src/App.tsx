import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";


function App() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            if (e instanceof Error) {
                console.error(e);
            }
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    if (!store.isAuth) {
        return (
            <LoginForm />
        )
    }

  return (
    <div className="App">
        <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'Sign IN '}</h1>
        <button onClick={() => store.logout()}>Sign Out</button>
        <div>
            <button onClick={getUsers}>
                Get All Users
            </button>
        </div>
        {
            users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))
        }
    </div>
  );
}

export default observer(App);
