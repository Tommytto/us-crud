import CRUDRow from "components/CRUDRow";
import CRUDListContainer from "components/CRUDListContainer";
import CRUDHeader from "components/CRUDHeader";
import CRUDLayout from "components/CRUDLayout";
import CRUDList from "components/CRUDList";
import CRUDRowContainer from "components/CRUDRowContainer";
import CRUDModal from "components/CRUDModal";
import CRUDCreateModalContainer from "components/CRUDCreateModalContainer";
import React from "react";
import CRUDCreateModal from "components/CRUDCreateModal";
import CRUDEntityForm from "components/CRUDEntityForm";
import CRUDEntityFormContainer from "components/CRUDEntityFormContainer";

export const DEFAULT_COMPONENT_CONFIG = {
    Row: CRUDRow,
    List: CRUDList,
    RowContainer: CRUDRowContainer,
    ListContainer: CRUDListContainer,
    Header: CRUDHeader,
    Layout: CRUDLayout,
    Modal: CRUDModal,
    EntityForm: CRUDEntityForm,
    EntityFormContainer: CRUDEntityFormContainer,
    CreateModalContainer: CRUDCreateModalContainer,
    CreateModal: CRUDCreateModal
};

export const CRUDComponentConfigContext = React.createContext(
    DEFAULT_COMPONENT_CONFIG
);
export const CRUDFormFieldContext = React.createContext(null);
export const CRUDModelContext = React.createContext(null);
