import React from "react";
import CRUDRowWrapper from "components/CRUDRowWrapper";

const CRUDList = ({ list, isLoading }) => {
    console.log(isLoading);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <table>
            <tbody>
                {list.map(id => (
                    <CRUDRowWrapper key={id} id={id} />
                ))}
            </tbody>
        </table>
    );
};

export default CRUDList;
