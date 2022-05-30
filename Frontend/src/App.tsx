import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "./Utils/utils";
import Routes from "./Components/Routes";
import { setIsOperator, setToken, setUser } from "./redux/slices/userSlice";
import IUserInfo from "./Models/IUserInfo";
import { useAppDispatch } from "./redux/hooks";
import IJwtToken from "./Models/IJwtToken";
import api from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

const App: React.FC = () => {
    let [isLoading, setIsLoading] = useState<boolean>(true);
    let dispatch = useAppDispatch();
    useEffect(() => {
        let token: IJwtToken | null = getTokenFromLocalStorage();

        if (token) {
            try {
                let userInfo: Promise<IUserInfo | null> = api.auth.getUserInfo();
                userInfo.then(user => {
                    if (user) {
                        console.log(user);
                        dispatch(setUser(user));
                        if (user?.isOperator)
                            dispatch(setIsOperator(user?.isOperator));
                        setIsLoading(false);
                    }
                });
                dispatch(setToken(token));
            } catch (e) {

            }
        } else {
            //history.push("/home");
            setIsLoading(false);
        }
    }, [dispatch]);

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <Routes />
    );
};

export default App;
