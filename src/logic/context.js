import CRUDRow from "components/CRUDRow";
import CRUDListContainer from "components/CRUDListContainer";
import CRUDHeader from "components/CRUDHeader";
import CRUDLayout from "components/CRUDLayout";
import CRUDList from "components/CRUDList";
import CRUDRowContainer from "components/CRUDRowContainer";
import CRUDModal from "components/CRUDModal";
import CRUDCreateModalContainer from "components/CRUDCreateModalContainer";
import CRUDDeleteModalContainer from "components/CRUDDeleteModalContainer";
import CRUDUpdateModalContainer from "components/CRUDUpdateModalContainer";
import React from "react";
import CRUDCreateModal from "components/CRUDCreateModal";
import CRUDDeleteModal from "components/CRUDDeleteModal";
import CRUDUpdateModal from "components/CRUDUpdateModal";
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
    DeleteModalContainer: CRUDDeleteModalContainer,
    UpdateModalContainer: CRUDUpdateModalContainer,
    CreateModal: CRUDCreateModal,
    DeleteModal: CRUDDeleteModal,
    UpdateModal: CRUDUpdateModal
};

export const CRUDComponentConfigContext = React.createContext(
    DEFAULT_COMPONENT_CONFIG
);
export const CRUDFormFieldContext = React.createContext(null);
export const CRUDModelContext = React.createContext(null);
export const CRUDBasePathContext = React.createContext(null);
