import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Container, Stack } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { setToken, setUser } from "../../redux/slices/userSlice";
import IUserInfo from "../../Models/IUserInfo";
import IRegistryRequest from "../../Models/IRegistryRequest";
import api from "../../services/api";
import ILoginRequest from "../../Models/ILoginRequest";
import ILoginResponse from "../../Models/ILoginResponse";
import { } from "@microsoft/signalr/dist/esm/Utils";

const Registry: React.FunctionComponent = () => {
    let history = useHistory();
    let dispatch = useAppDispatch();
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [brandAuto, setBrandAuto] = useState("");
    let [modelAuto, setModelAuto] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    let submitHandler = (e: any) => {
        try {
            e.preventDefault();

            const registryDetails: IRegistryRequest = {
                email: email,
                userName: username,
                brand: brandAuto,
                model: modelAuto,
                password: password,
                confirmPassword: confirmPassword
            };
            let RegistryPromise = api.auth.register(registryDetails);
            RegistryPromise.then((response) => {
                if (response.isSucceed) {
                    let loginDetails: ILoginRequest = {
                        email: email,
                        password: password
                    };
                    console.log(response.isSucceed);
                    let LoginPromise = api.auth.login(loginDetails);
                    LoginPromise.then((response: ILoginResponse) => {
                        if (response.token) {
                            dispatch(setToken(response?.token));
                            localStorage.setItem("token", JSON.stringify(response.token));

                            let userInfo: Promise<IUserInfo | null> = api.auth.getUserInfo();
                            userInfo.then(user => {
                                if (user) {
                                    dispatch(setUser(user));
                                }
                            });
                            history.push("/home");
                        }
                    });
                };
            });

        } catch (er) {
            console.log(er);
        }
    };
    //Login - h3
    return (
        <Container>
            <Form>

                <Stack gap={2} direction="vertical" className="justify-content-center pt-4 col-md-5 mx-auto">
                    <h1 className='aqua shadow'>Registration</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='aqua shadow'>email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='aqua shadow'>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password confirmation"
                            name="confirmPassword"
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </Form.Group>
                    <Button variant="btn btn-outline-info mt-3" type="submit"
                        onClick={submitHandler}>
                        Sign up
                    </Button>
                    <Link to="/">
                        <Button variant="btn btn-outline-info ">
                            Back to the welcom page
                        </Button>
                    </Link>

                </Stack>
            </Form>
        </Container>
    );
};

export default Registry;
