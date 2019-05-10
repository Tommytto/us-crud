import {useDispatch} from "react-redux";

export function useModelActions(model) {
    const dispatch = useDispatch();

    function getField(fieldName) {
        const fieldMethods = model.getField(fieldName).getActions();

        const wrappedMethods = Object.keys(fieldMethods).reduce((result, methodName) => ({
            ...result,
            [methodName]: (...props) => {
                dispatch(fieldMethods[methodName].getActionCreator()(...props))
            }
        }), {});

        return wrappedMethods;
    }
    return {
        getField
    }
}