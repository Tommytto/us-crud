import React from "react";

const CRUDRow = ({ rowData: { id, ...rest } }) => {
    return (
        <tr key={id}>
            {Object.values(rest).map((value, i) => (
                <td key={i}>{value}</td>
            ))}
        </tr>
    );
};

export default CRUDRow;
