import React, { useMemo } from "react";
import { useCRUDBasePath, useCRUDComponent } from "logic/hooks";
import { Route, Switch } from "react-router";
import CRUDModals from 'components/CRUDModals'

const CRUDLayout = () => {
    const {
        Header,
        ListContainer
    } = useCRUDComponent();

    const basePath = useCRUDBasePath();
    // const routeConfig = useMemo(
    //     () => [
    //         {
    //             url: "/:actionId",
    //             component: makeModalActivator(MODAL_TYPES.create)
    //         },
    //         {
    //             url: "/:entityId/:actionId",
    //             component: () => {
    //                 const Activator = makeModalActivator(MODAL_TYPES.delete);
    //                 return (
    //                     <>
    //                         <Activator />
    //                         <DeleteModalContainer />
    //                     </>
    //                 );
    //             }
    //         },
    //         {
    //             url: "/:entityId/:actionId",
    //             component: makeModalActivator(MODAL_TYPES.update)
    //         }
    //     ],
    //     []
    // );

    return (
        <>
            <Header />
            {/*<ListContainer />*/}
            <Switch>
                <Route
                    path={[
                        basePath + "/:entityId/:actionId",
                        basePath + "/:actionId",
                        basePath,
                    ]}
                    component={CRUDModals}
                />
                {/*{routeConfig.map(({ url, component }) => (*/}
                {/*    <Route*/}
                {/*        key={url}*/}
                {/*        path={[basePath + url]}*/}
                {/*        component={component}*/}
                {/*    />*/}
                {/*))}*/}
            </Switch>
        </>
    );
};

export default CRUDLayout;
