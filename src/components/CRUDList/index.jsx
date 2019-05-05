import React from "react";
import { Table } from "antd";

const CRUDList = ({ dataList, isLoading, columns }) => {
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return <Table rowKey="id" dataSource={dataList} columns={columns} />;
};

export default CRUDList;
