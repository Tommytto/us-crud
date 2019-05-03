import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

function Apple({ id, color }) {
    console.log("Apple", id);
    return <div style={{ backgroundColor: color }} className="apple" />;
}

export default fromStore(Apple, (state, props) => state.apple.data[props.id]);
