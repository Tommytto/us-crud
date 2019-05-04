import { useContext } from "react";
import {
    CRUDComponentConfigContext,
    CRUDFormFieldContext
} from "logic/context";

export function useCRUDComponent() {
    return useContext(CRUDComponentConfigContext);
}

export function useCRUDFormField() {
    return useContext(CRUDFormFieldContext);
}
