import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IPrivateRouteProps extends RouteProps {
    component: any;
}

const ProtectedRoute: React.FunctionComponent<IPrivateRouteProps> = ({
    component: Component, ...rest
}) => {

    const userId = useAppSelector(state => state.user.userInfo?.id);
    console.log(userId);
    if (userId) {
        return (<Route
            {...rest}
            render={props => <Component {...props} />} />
        );
    }

    return (
        <Route
            {...rest}
            render={props => <Redirect
                to={{
                    pathname: "/welcome",
                    state: { from: props.location }
                }}
            />} />
    );
};

export default ProtectedRoute;