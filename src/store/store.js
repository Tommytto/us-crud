import React, { useReducer, useMemo, useContext } from "react";
import store, { initialState } from "./reducers";

const StoreContext = React.createContext(null);
const DispatchContext = React.createContext(null);



export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(store, initialState);
    return (
        <StoreContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StoreContext.Provider>
    );
}

export function useStore(func) {
    const state = useContext(StoreContext);
    return func(state);
}

export function useDispatch() {
    return useContext(DispatchContext);
}
