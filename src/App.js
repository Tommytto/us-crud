import React from "react";
import "./App.css";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "store/reducers";
import { Provider } from "react-redux";
import UserList from "components/UserList";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {EventEmitter} from "node/events";
const { Header, Content } = Layout;

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item key="1">Company</Menu.Item>
                        <Menu.Item key="2">Users</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div className="ant-row">
                            <div className="ant-col-24">
                                <UserList />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Provider>
    );
}

export default App;
