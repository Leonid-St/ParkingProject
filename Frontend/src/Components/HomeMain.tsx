import { Lookup, Popup } from "devextreme-react";
import { DropDownOptions } from "devextreme-react/autocomplete";
import DataSource from "devextreme/data/data_source";
import React, { useEffect, useState } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import ICar from "../Models/ICar";
import { useAppSelector } from "../redux/hooks";
import api from "../services/api";
const HomeMain: React.FunctionComponent = () => {
    let token = useAppSelector(state => state.user.token);
    const userId = useAppSelector(state => state.user.userInfo?.id);
    const [cars, setCars] = useState<ICar[]>();
    const [popVisible, setPopVisible] = useState<boolean>();
    const [data, setData] = useState<DataSource<any, any>>();
    useEffect(() => {
        const getCar = async () => {
            await api.car.get().then((e) => {
                setCars(e);
                setData(new DataSource({
                    store: e,
                    key: "id",
                    group: "brandName",
                }));
            });
        };
        getCar();

    }, []);
    const entryCar = () => {
        setPopVisible(true);
        //api.parking.postNewParking(userId,)
    };
    let history = useHistory();

    // const groupedData = new DataSource({
    //     store: cars,
    //     key: "id",
    //     group: "brandName",
    // });
    console.log(data);
    return (
        <>
            <Popup
                visible={popVisible}
                onHiding={() => { setPopVisible(false); }}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showCloseButton={false}
                showTitle={true}
                title="Information"
                container=".dx-viewport"
                width={300}
                height={280}
            >
                <Lookup
                    items={data ?? undefined}
                    displayExpr="carId"
                // defaultValue={cars[0] ? cars[0]! : undefined}
                >
                    <DropDownOptions showTitle={false} />
                </Lookup>
            </Popup>
            <div >
                <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center overflow-hidden  " ><Row >
                    {token && <Col className="d-flex justify-content-center gx-5 p-5 "><Button
                        className="btn btn-outline-info"
                        variant="dark" onClick={() => { entryCar(); }}> Поставить машину на стоянку</Button>
                    </Col>}
                    <Col className="d-flex justify-content-center  gx-5 p-5">
                        <Button className="btn btn-outline-info" variant="dark" onClick={() => { history.push("/home/todoView"); }}>Забрать машину со стоянки</Button>
                    </Col>
                </Row></Container>
            </div>
        </>
    );
};

export default HomeMain;
