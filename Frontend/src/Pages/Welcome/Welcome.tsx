import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Welcome: React.FC = () => {
    return (
        <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1 className='aqua shadow'>Parking Project</h1>
            <h3 className="aqua pt-1">Место, где вы можете оставить свой автомобиль</h3>
            <Stack gap={4} direction="horizontal" className="justify-content-center pt-4">
                <Link to="/auth/login" >
                    <Button size="lg" variant="px-3 btn-outline-info" >
                        Вход
                    </Button>
                </Link>
                <Link to="/auth/register">
                    <Button size="lg" variant="px-3 btn-outline-info">
                        Регистрация
                    </Button>
                </Link>
            </Stack>
            {/* <Link to="/home" className="text-decoration-none   mt-3">
                Войти без регистарции
            </Link> */}
        </Container>
    );
};
export default Welcome;
