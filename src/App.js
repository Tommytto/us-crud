import React from "react";
import "./App.css";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "store/reducers";
import { Provider } from "react-redux";
import UserList from "components/UserList";
import CompanyList from "components/CompanyList";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import './model_v3/Model'


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
            <BrowserRouter>
                <Layout>
                    <Header>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="1">
                                <Link to="/company">Companies</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/user">Users</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div
                            style={{
                                padding: 24,
                                background: "#fff",
                                minHeight: 360
                            }}
                        >
                            <div className="ant-row">
                                <div className="ant-col-24">
                                    <Switch>
                                        {/*<Route*/}
                                        {/*    path="/company"*/}
                                        {/*    component={CompanyList}*/}
                                        {/*/>*/}
                                        <Route
                                            path="/user"
                                            component={UserList}
                                        />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
