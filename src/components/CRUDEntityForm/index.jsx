import React from 'react';
import {useCRUDFormField} from "logic/hooks";
import {Form, Input} from "antd";

const CRUDEntityForm = ({onCreate}) => {
    const fieldConfig = useCRUDFormField();

    return (
        <Form>
            <Form.Item>
                <Input/>
            </Form.Item>
        </Form>
    );
};

export default CRUDEntityForm;