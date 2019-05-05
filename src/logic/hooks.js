import { useCallback, useContext } from "react";
import {
    CRUDComponentConfigContext,
    CRUDFormFieldContext,
    CRUDBasePathContext
} from "logic/context";
import { __RouterContext } from "react-router";

export function useCRUDComponent() {
    return useContext(CRUDComponentConfigContext);
}

export function useCRUDFormField() {
    return useContext(CRUDFormFieldContext);
}

export function useCRUDBasePath() {
    return useContext(CRUDBasePathContext);
}

export function useRouter() {
    return useContext(__RouterContext);
}

export function useRouteParams() {
    return useRouter().match.params;
}

export function useBackToBase() {
    const { history } = useRouter();
    const basePath = useCRUDBasePath();
    return useCallback(() => {
        history.push(basePath);
    }, [basePath]);
}
