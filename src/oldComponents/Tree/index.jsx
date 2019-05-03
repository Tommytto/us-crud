import React, { useRef } from "react";
import Apple from "../Apple";
import { fromStore } from "store/model";
import "./style.css";
import { actionAddApple } from "../../store/reducers";
import { useDispatch } from "react-redux";

function Tree({ id, color, appleList }) {
    const dispatch = useDispatch();
    console.log("Tree", id);
    return (
        <div>
            <button
                onClick={() => {
                    dispatch(
                        actionAddApple({
                            parentId: id,
                            id: Date.now(),
                            color
                        })
                    );
                }}
            >
                Add apple
            </button>
            <div
                style={{ backgroundColor: color, marginBottom: 10 }}
                className="tree"
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {appleList.map(appleId => (
                    <Apple key={appleId} id={appleId} />
                ))}
            </div>
        </div>
    );
}

export default fromStore(Tree, (state, props) => state.tree.data[props.id]);
