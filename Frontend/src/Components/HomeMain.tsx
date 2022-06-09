import { Button, Grid, Stack } from "@mui/material";
import { DateBox, Lookup, Popup } from "devextreme-react";
import { DropDownOptions } from "devextreme-react/autocomplete";
import DataSource from "devextreme/data/data_source";
import React, { useEffect, useState } from "react";

import { Button as ButtonReactBootstrap, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { isParameter } from "typescript";
import ICar from "../Models/ICar";
import IParking from "../Models/IParking";
import { useAppSelector } from "../redux/hooks";
import api from "../services/api";
const HomeMain: React.FunctionComponent = () => {
    let token = useAppSelector(state => state.user.token);
    const userId = useAppSelector(state => state.user.userInfo?.id);
    const [cars, setCars] = useState<ICar[]>();
    const [popVisible, setPopVisible] = useState<boolean>();
    const [popVisiblePickUp, setPopVisiblePickUp] = useState<boolean>();
    const [data, setData] = useState<DataSource<any, any>>();
    const [carIdValue, setCarIdValue] = useState();
    const [datePutValue, setDatePutValue] = useState();
    const [parking, setParking] = useState<IParking[]>();
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
        const getParking = async () => {
            await api.parking.get().then((e) => {
                setParking(e);
            });
        };
        getCar();
        getParking();

    }, []);
    const entryCar = () => {
        setPopVisible(true);
        //api.parking.postNewParking(userId,)
    };
    const pickUpCar = () => {
        setPopVisiblePickUp(true);
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
                onHiding={() => { setPopVisible(false); setCarIdValue(undefined); }}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showCloseButton={false}
                showTitle={true}
                title="Select your car id"
                container=".dx-viewport"
                width={"50%"}
                height={"50%"}
            >
                <Stack direction="column" justifyContent={"center"} alignItems={"flex-start"} >
                    <Grid item style={{ minWidth: 300, width: "65%", alignContent: "start" }}>
                        <div className="dx-field">
                            <h5 className="dx-field-label">carId</h5>
                        </div>
                        <Lookup
                            width={"85%"}
                            items={(() => {
                                if (parking && cars) {
                                    let carkArr: ICar[] = [...cars];
                                    cars.forEach((c) => {
                                        parking?.forEach((p) => {
                                            if (c.id === p.carId) {
                                                var i = carkArr.indexOf(c);
                                                if (i !== -1) {
                                                    carkArr.splice(i, 1);
                                                }
                                            }
                                        });
                                    });
                                    return carkArr ?? undefined;
                                }
                                return undefined;

                            })()}
                            displayExpr="id"
                            valueExpr="id"
                            onValueChanged={(e) => { setCarIdValue(e.value); }}
                        >
                            <DropDownOptions showTitle={false} />
                        </Lookup>
                    </Grid>

                    <div className="dx-field" >
                        <h5 className="dx-field-label" style={{ minWidth: 300 }}>Expected date exit</h5>
                    </div>
                    <div className="dx-field-value " style={{ minWidth: 250, alignItems: "center", justifyContent: "center" }}>
                        <DateBox
                            onValueChanged={(e) => { setDatePutValue(e.value); }}
                            type="datetime" />
                    </div>
                    <Grid container justifyContent={"center"} alignContent={"center"}>
                        <ButtonReactBootstrap
                            style={{ height: 50, margin: "50px", width: "25%", minWidth: "150px" }}
                            className="btn btn-outline-info"
                            onClick={() => {
                                if (userId && carIdValue) {
                                    api.parking.postNewParking({
                                        userId: userId,
                                        carId: carIdValue,
                                        expectedDateExit: datePutValue ?? undefined
                                    });
                                    setPopVisible(false);
                                    setCarIdValue(undefined);
                                    window.location.reload();
                                }
                            }}
                            variant="dark">Submit</ButtonReactBootstrap>
                    </Grid>
                </Stack>
            </Popup>
            <Popup
                visible={popVisiblePickUp}
                onHiding={() => { setPopVisiblePickUp(false); setCarIdValue(undefined); }}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showCloseButton={false}
                showTitle={true}
                title="Select your car id"
                container=".dx-viewport"
                width={"50%"}
                height={"50%"}
            >
                <Stack direction="column" justifyContent={"center"} alignItems={"flex-start"} >
                    <Grid item style={{ minWidth: 300, width: "65%", alignContent: "start" }}>
                        <div className="dx-field">
                            <h5 className="dx-field-label">carId</h5>
                        </div>
                        <Lookup
                            width={"85%"}
                            items={(() => {
                                if (parking && cars) {
                                    let carkArr: ICar[] = [];
                                    cars.forEach((c) => {
                                        parking?.forEach((p) => {
                                            if (c.id === p.carId) {
                                                carkArr.push(c);
                                            }
                                        });
                                    });
                                    return carkArr ?? undefined;
                                }
                                return undefined;

                            })()}
                            displayExpr="id"
                            valueExpr="id"
                            onValueChanged={(e) => { setCarIdValue(e.value); }}
                        >
                            <DropDownOptions showTitle={false} />
                        </Lookup>
                    </Grid>
                    <Grid container justifyContent={"center"} alignContent={"center"}>
                        <ButtonReactBootstrap
                            style={{ height: 50, margin: "50px", width: "25%", minWidth: "150px" }}
                            className="btn btn-outline-info"
                            onClick={() => {
                                if (parking) {
                                    let park: IParking | undefined;
                                    parking.forEach((p: IParking) => {
                                        if (p.carId === carIdValue) {
                                            park = p;
                                        }
                                    });
                                    if (userId && carIdValue && park) {
                                        api.parking.deleteParking({
                                            id: park.id,
                                            userId: userId,
                                            carId: park.carId,
                                        });
                                        setPopVisiblePickUp(false);
                                        setCarIdValue(undefined);
                                        window.location.reload();
                                    }
                                }


                            }}
                            variant="danger">Submit</ButtonReactBootstrap>
                    </Grid>
                </Stack>
            </Popup>
            <div >
                <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center overflow-hidden" >
                    <Row >
                        {token && <Col className="d-flex justify-content-center gx-5 p-5 "><ButtonReactBootstrap
                            className="btn btn-outline-info"
                            variant="dark" onClick={() => { entryCar(); }}>Put your car in the parking lot</ButtonReactBootstrap>
                        </Col>}
                        <Col className="d-flex justify-content-center  gx-5 p-5">
                            <ButtonReactBootstrap className="btn btn-outline-info " variant="dark" onClick={
                                () => { pickUpCar(); }}>
                                Pick up the car from the parking lot
                            </ButtonReactBootstrap>
                        </Col>
                    </Row></Container>
            </div>
        </>
    );
};

export default HomeMain;
