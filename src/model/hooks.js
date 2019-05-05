import { useDispatch } from "react-redux";

export function useModelActions(model) {
    const dispatch = useDispatch();

    return Object.keys(model.actions).reduce((result, key) => {
        return {
            ...result,
            [key]: (...data) => dispatch(model.actions[key](...data))
        };
    }, {});
}
