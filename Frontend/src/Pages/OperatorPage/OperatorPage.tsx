import React, { useEffect, useState } from "react";
import { Form, Button, Container, Stack } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setIsOperator, setToken, setUser } from "../../redux/slices/userSlice";
import IUserInfo from "../../Models/IUserInfo";
import api from "../../services/api";
import ILoginRequest from "../../Models/ILoginRequest";
import { DataGrid } from 'devextreme-react';
import {
    Column,
    Editing,
    Lookup,
    Pager,
    Paging,
    RequiredRule,
    SearchPanel,
    MasterDetail,
    Scrolling,
} from 'devextreme-react/data-grid';

const OperatorPage: React.FunctionComponent = () => {

    let [parkingList, setparkingList] = useState();
    let history = useHistory();
    let dispatch = useAppDispatch();

    let submitHandler = (e: any) => {
        try {

        } catch (er) {
            console.log(er);
        }
    };
    //TO DO FETCH DATA TO TABLE!!
    // useEffect(() => {
    //     let get = api.parking.get();

    //     get.then((responseParking) => {
    //         //  if (typeof e === "object" && (e as Array<IRoom>).length > 0) {
    //         setparkingList(responseParking as any);
    //         // }
    //     });
    // }, []);

    return (

        <Container>

            <Form>

                <Stack gap={3} direction="vertical" className="justify-content-center ">
                    <h1 style={{ justifyContent: "top", textAlign: "center" }} className="aqua shadow">OPERATOR PAGE </h1>
                    <DataGrid
                        dataSource={parkingList}
                        keyExpr="id"
                        focusedRowEnabled
                        showBorders
                        rowAlternationEnabled
                        // className={styles['receivers-grid']}
                        // onRowInserting={this.handleRowInserting}
                        // onRowRemoved={this.handleRowRemoving}
                        // onRowUpdating={this.handleRowUpdating}
                        // onRowPrepared={this.handleRowPrepared}
                        // onEditingStart={this.onEditingStart}
                        // onEditCanceling={() => this.setState({ editing: true })}
                        allowColumnResizing
                    // onEditorPreparing={this.onEditorPreparing}
                    >
                        <SearchPanel visible placeholder="Искать..." width={400} />
                        <Editing
                            allowAdding
                            allowUpdating
                            allowDeleting
                            selectTextOnEditStart
                            useIcons
                            confirmDelete
                            mode="popup"
                        />

                        <Paging defaultPageSize={10} />
                        <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50]} showInfo />
                        <Column
                            dataField="UserId"
                            caption="Users"
                            allowSorting={false}

                        >
                            <RequiredRule />
                        </Column>
                        <Column dataField="CarId"
                            caption="Cars"
                            allowSorting={false}>
                            <RequiredRule />
                        </Column>
                        <Column dataField="DateEntry"
                            caption="DateEntry"
                            allowSorting={false}>
                            {/* <Lookup dataSource={tasks}
                                displayExpr="name"
                                valueExpr="id" /> */}
                            <RequiredRule />
                        </Column>
                        <Column dataField="ExpectedDateExit"
                            caption="ExpectedDateExit"
                            allowSorting={false}>
                            {/* <Lookup dataSource={callCenters} 
                            displayExpr="name"
                             valueExpr="id" /> */}
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="ActualDateExit"
                            caption="ActualDateExit"
                            allowSorting={false}
                        >
                            {/* <Lookup
                                dataSource={distributionSchemes}
                                displayExpr="name"
                                valueExpr="id"
                            /> */}
                            <RequiredRule />
                        </Column>
                        {/* <MasterDetail enabled component={RolesInfo} /> */}
                        <Scrolling useNative />
                    </DataGrid>
                </Stack>
            </Form>
        </Container>
    );
};

export default OperatorPage;
