import React from "react";
import { useCRUDFormField } from "logic/hooks";
import { Form } from "antd";

const CRUDEntityForm = ({ form, initialValues }) => {
    const fieldConfig = useCRUDFormField();
    const { getFieldDecorator } = form;
    return (
        <Form>
            {Object.values(fieldConfig).map(
                ({ Component, label, fieldProps }) => {
                    return (
                        <Form.Item key={fieldProps.name} label={label}>
                            {getFieldDecorator(fieldProps.name, {
                                initialValue: initialValues[fieldProps.name]
                            })(<Component {...fieldProps} />)}
                        </Form.Item>
                    );
                }
            )}
        </Form>
    );
};

CRUDEntityForm.defaultProps = {
    initialValues: {}
};

export default CRUDEntityForm;
