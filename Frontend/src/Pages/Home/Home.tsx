import React, { } from "react";
import NavbarHome from "../../Components/Navbar";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import HomeMain from "../../Components/HomeMain";
import { useAppSelector } from "../../redux/hooks";
import OperatorPage from "../OperatorPage/OperatorPage";
import { Stack } from "react-bootstrap";
export const Home: React.FunctionComponent = () => {
    const isOperator = useAppSelector(state => state.user.IsOperator);
    console.log(isOperator);
    return (
        <>
            <NavbarHome />
            <Switch>
                {isOperator ? (<><OperatorPage /></>) :
                    <>
                        <Route render={() => {
                            return (<HomeMain />);
                        }}></Route>
                    </>
                }
            </Switch>

            {/* {isOperator ? (<></>) : (<NavbarHome />)} */}


        </>
    );
};

export default Home;
