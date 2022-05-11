import React from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAppSelector } from "../redux/hooks";
const HomeMain: React.FunctionComponent = () => {
    let token = useAppSelector(state => state.user.token);

    let history = useHistory();
    return (
        // eslint-disable-next-line react/style-prop-object
        <div >
            <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center overflow-hidden  " ><Row >
                {token && <Col className="d-flex justify-content-center gx-5 p-5 "><Button
                    className="btn btn-outline-info"
                    variant="dark" onClick={() => { history.push("/home/todoView"); }}> Поставить машину на стоянку</Button>
                </Col>}
                <Col className="d-flex justify-content-center  gx-5 p-5">
                    <Button className="btn btn-outline-info" variant="dark" onClick={() => { history.push("/home/todoView"); }}>Забрать машину со стоянки</Button>
                </Col>
            </Row></Container>
        </div>);
};

export default HomeMain;
