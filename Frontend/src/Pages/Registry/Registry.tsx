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
                brand:brandAuto,
                model:modelAuto,
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
                    <h1 className='aqua shadow'>Регистрация</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='aqua shadow'>Почта</Form.Label>
                        <Form.Control type="email" placeholder="Введите почту"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Имя пользователя</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя пользователя"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Бред машины</Form.Label>
                        <Form.Control type="text" placeholder="Введите бред машины"
                            name="username"
                            onChange={e => setBrandAuto(e.target.value)}
                            value={brandAuto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Марка</Form.Label>
                        <Form.Control type="text" placeholder="Введите модель машины"
                            name="username"
                            onChange={e => setModelAuto(e.target.value)}
                            value={modelAuto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='aqua shadow'>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className='aqua shadow'>Подтверждение пароля</Form.Label>
                        <Form.Control type="password" placeholder="Введите подтверждение пароля"
                            name="confirmPassword"
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </Form.Group>
                    <Button variant="btn btn-outline-info mt-3" type="submit"
                        onClick={submitHandler}>
                        Зарегестрироваться
                    </Button>
                    <Link to="/">
                        <Button variant="btn btn-outline-info ">
                            Вернутся на главную страницу
                        </Button>
                    </Link>

                </Stack>
            </Form>
        </Container>
    );
};

export default Registry;
