import React from "react";
import {Route, Switch,Redirect } from "react-router-dom";
import Logout from "../Components/Logout";
import Login from "../Pages/Login/Login";
import Registry from "../Pages/Registry/Registry";
import Welcome from "../Pages/Welcome/Welcome";
import Home from "../Pages/Home/Home";
import { useAppSelector } from "../redux/hooks";

const Routes: React.FunctionComponent = () => {
    let token= useAppSelector(state=>state.user.token);
    return (
        <>
            <Switch>
                <Route path='/welcome' render={() => <Welcome/>}/>

                <Route path='/auth/register' render={() => <Registry/>}/>

                <Route path='/auth/login' render={() => <Login/>}/>

                {token?<Route path='/' exact render={() => <Redirect
                    to={{
                        pathname: "/home",
                    }}
                />}/>:<Route path='/' exact render={() => <Redirect
                    to={{
                        pathname: "/welcome",
                    }}
                />}/>}
                
                <Route path='/home' component={Home}/>

                <Route path="/auth/logout" render={() => <Logout/>}/>

                <Route render={() => <h1>Page Not Found</h1>}/>
            </Switch>
        </>
    );
};

export default Routes;
