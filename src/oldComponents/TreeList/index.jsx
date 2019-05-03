import React, { useEffect, useContext } from "react";
import { actionSetAppleList, actionSetTreeList } from "../../store/reducers";
import Tree from "components/Tree";
import { useDispatch, useSelector } from "react-redux";
import { fromStore } from "store/model";

function normalizeResponse(
    data,
    reduce = data.treeList.reduce(
        (result, tree) => {
            const appleData = tree.appleList.reduce((result, apple) => {
                return {
                    ...result,
                    [apple.id]: apple
                };
            }, {});
            tree.appleList = tree.appleList.map(i => i.id);
            return {
                tree: {
                    data: {
                        ...result.tree.data,
                        [tree.id]: tree
                    },
                    idList: [...result.tree.idList, tree.id]
                },
                apple: {
                    ...result.apple,
                    ...appleData
                }
            };
        },
        {
            tree: {
                data: {},
                idList: []
            },
            apple: {}
        }
    )
) {
    return reduce;
}

function TreeList({ tree }) {
    const dispatch = useDispatch();
    console.log("Tree list");
    useEffect(() => {
        (async () => {
            const response = await fetch("/info.json");
            const data = await response.json();
            const { tree, apple } = normalizeResponse(data);

            dispatch(actionSetAppleList(apple));
            dispatch(actionSetTreeList(tree));
        })();
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    dispatch({ type: "wqdqwd" });
                }}
            >
                Update
            </button>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {tree.idList.map(id => (
                    <Tree key={id} id={id} />
                ))}
            </div>
        </>
    );
}
export default fromStore(TreeList, state => {
    return {
        tree: state.tree
    };
});
