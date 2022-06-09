import React, { useState } from "react";
import { Form, Button, Container, Stack } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setIsOperator, setToken, setUser } from "../../redux/slices/userSlice";
import IUserInfo from "../../Models/IUserInfo";
import api from "../../services/api";
import ILoginRequest from "../../Models/ILoginRequest";

const Login: React.FunctionComponent = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let history = useHistory();
    let dispatch = useAppDispatch();

    let submitHandler = (e: any) => {
        try {
            e.preventDefault();

            const loginDetails: ILoginRequest = {
                email,
                password,
            };

            let LoginPromise = api.auth.login(loginDetails);
            LoginPromise.then((response => {
                if (response.token) {
                    dispatch(setToken(response?.token));
                    dispatch(setIsOperator(response?.isOperator));
                    localStorage.setItem("token", JSON.stringify(response.token));
                    let userInfo: Promise<IUserInfo | null> = api.auth.getUserInfo();
                    userInfo.then(user => {
                        if (user) {
                            dispatch(setUser(user));
                        }
                    });
                    history.push("/home");
                }

            }));
        } catch (er) {
            console.log(er);
        }
    };

    return (
        <Container>
            <Form>
                <Stack gap={3} direction="vertical" className="justify-content-center pt-4 col-md-5 mx-auto">
                    <h1 className='aqua shadow'>LogIn</h1>
                    <Form.Group className="mb-3 aqua shadow" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email"
                            name="email"
                            onChange={(e: any) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group className="aqua shadow mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password"
                            onChange={(e: any) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                        />
                    </Form.Group >
                    <Button variant="btn btn-outline-info mt-3" type="submit"
                        onClick={submitHandler}>
                        logIn
                    </Button>
                    <Link to="/" >
                        <Button variant="btn btn-outline-info ">
                            Back to the welcom page
                        </Button>
                    </Link>
                </Stack>
            </Form>
        </Container>
    );
};

export default Login;
