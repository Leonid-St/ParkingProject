import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Container, Stack } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setIsOperator, setToken, setUser } from "../../redux/slices/userSlice";
import IUserInfo from "../../Models/IUserInfo";
import api from "../../services/api";
import ILoginRequest from "../../Models/ILoginRequest";
import { DataGrid } from "devextreme-react";
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
} from "devextreme-react/data-grid";
import IBrand from "../../Models/IBrand";
import IModel from "../../Models/IModel";
import ICar from "../../Models/ICar";
import { TabsSwitcher } from "../../Components/Tabs";
import IParking from "../../Models/IParking";
import "./style.css";
import DataGridRowInsertingEvent from "../../Models/DataGridInsertingEvents";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import IRequestPostModel from "../../Models/RequestPostModel";

const OperatorPage: React.FunctionComponent = () => {

    let [brandsList, setBrandsList] = useState<IBrand[]>();
    let [modelsList, setModelsList] = useState<IModel[]>();
    let [carsList, setCarsList] = useState<ICar[]>();
    let [parkingsList, setParkingsList] = useState<IParking[]>();
    let [editing, setEditing] = useState<boolean>(true);
    let history = useHistory();
    let dispatch = useAppDispatch();

    let submitHandler = (e: any) => {
        try {

        } catch (er) {
            console.log(er);
        }
    };
    useEffect(() => {
        api.models.get().then((response) => {
            //  if (typeof e === "object" && (e as Array<IRoom>).length > 0) {
            setModelsList(response);
            // }
            console.log(response);
        });
        api.brand.get().then((response) => {
            //  if (typeof e === "object" && (e as Array<IRoom>).length > 0) {
            setBrandsList(response);
            // }
            console.log(response);
        });
        api.car.get().then((response) => {
            //  if (typeof e === "object" && (e as Array<IRoom>).length > 0) {
            setCarsList(response);
            // }
        });
        api.parking.get().then((response) => {
            //  if (typeof e === "object" && (e as Array<IRoom>).length > 0) {
            setParkingsList(response);
            // }
        });
    }, []);
    const handleRowInsertingModels = (e: DataGridRowInsertingEvent<IModel>) => {
        if (e.data) {
            console.log(e.data);
            api.models.postNewModels({ brandName: (e as any).data.brandName, modelName: (e as any).data.modelName }).then((e) => {
                console.log(e);
            });
        }
        setEditing(true);

    };

    const handleRowInsertingBrand = (e: DataGridRowInsertingEvent<IBrand>) => {
        if (e.data) {
            api.brand.postNewBrand(e.data);
        }

    };
    // const handleRowInsertingCars = (e: DataGridRowInsertingEvent<ICar>) => {
    //     if (e.data) {
    //         api.car.postNewCar(e.data);
    //     }

    // };
    const handleRowRemovingModels = (e: DataGridRowInsertingEvent<IModel>) => {
        if (e.data) {
            api.models._deleteModels(e.data);
        }

    };
    const handleRowRemovingBrands = (e: DataGridRowInsertingEvent<IBrand>) => {
        if (e.data) {
            api.brand._deleteBrand(e.data);
        }

    };
    const onEditingStartCars = (e: any) => {
        console.log(e);
        console.log(e.data);
    }
    const onEditorPreparingCars = (e: any) => {
        console.log(e);
        console.log(e.data);
        console.log(a);

    }
    const onValueChangedLookupCars = (e: any) => {
        console.log(e);
    }
    const dataSourceModels = useMemo(() => {
        const store = new CustomStore({
            key: "id",
            //totalCount: async () => contactGroupPageInfo.totalCount,
            load: () => modelsList ?? [],
            cacheRawData: false,
            // insert: handleRowInserting,
            // update: handleRowUpdating,
            // remove: handleRowRemoving,
        });
        return new DataSource(store);
    }, [
        //contactGroupPageInfo.totalCount,
        modelsList,
        // handleRowInserting,
        // handleRowRemoving,
        // handleRowUpdating,
    ]);
    let a: any;
    const dataSourceBrands = useMemo(() => {
        const store = new CustomStore({
            key: "id",
            //totalCount: async () => contactGroupPageInfo.totalCount,
            load: () => brandsList ?? [],
            cacheRawData: false,
            // insert: handleRowInserting,
            // update: handleRowUpdating,
            // remove: handleRowRemoving,
        });
        return new DataSource(store);
    }, [
        //contactGroupPageInfo.totalCount,
        brandsList,
        // handleRowInserting,
        // handleRowRemoving,
        // handleRowUpdating,
    ]);
    return (
        <div>
            <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center overflow-hidden" >
                <h1 style={{ justifyContent: "top", textAlign: "center" }} className="aqua shadow">OPERATOR PAGE</h1>
                <TabsSwitcher
                    tabsList={[
                        {
                            label: "Brands",
                            component: <>
                                <Form>
                                    <Stack gap={3} direction="vertical" className="justify-content-center ">
                                        <DataGrid
                                            className={"opacity"}
                                            dataSource={brandsList}
                                            keyExpr="id"
                                            focusedRowEnabled
                                            showBorders
                                            rowAlternationEnabled
                                            // className={styles['receivers-grid']}
                                            onRowInserting={handleRowInsertingBrand}
                                            onRowRemoved={handleRowRemovingBrands}
                                            // onRowUpdating={this.handleRowUpdating}
                                            // onRowPrepared={this.handleRowPrepared}
                                            //onEditingStart={this.onEditingStart}
                                            //onEditCanceling={() => this.setState({ editing: true })}
                                            allowColumnResizing
                                        /// onEditorPreparing={this.onEditorPreparing}
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
                                                formItem={{ visible: false }}
                                                dataField="id"
                                                caption="id"
                                                allowSorting={false}

                                            >
                                            </Column>
                                            <Column
                                                dataField="name"
                                                caption="name"
                                                allowSorting={false}

                                            >
                                                <RequiredRule />
                                            </Column>
                                            {/* <Column dataField="listModels"
                                                caption="listModels"
                                                allowSorting={false}>
                                            </Column> */}
                                            {/* <MasterDetail enabled component={RolesInfo} /> */}
                                            <Scrolling useNative />
                                        </DataGrid>
                                    </Stack>
                                </Form></>,
                        },
                        {
                            label: "Modals",
                            component: <>
                                <Stack gap={3} direction="vertical" className="justify-content-center ">
                                    <DataGrid
                                        className={"opacity"}
                                        dataSource={modelsList}
                                        keyExpr="id"
                                        focusedRowEnabled
                                        showBorders
                                        rowAlternationEnabled
                                        // className={styles['receivers-grid']}
                                        onRowInserting={handleRowInsertingModels}
                                        onRowRemoved={handleRowRemovingModels}
                                        onRowUpdating={() => setEditing(true)}
                                        // onRowPrepared={this.handleRowPrepared}
                                        onEditingStart={() => setEditing(false)}
                                        onEditCanceling={() => setEditing(true)}
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
                                            formItem={{ visible: false }}
                                            dataField="id"
                                            caption="id"
                                            allowSorting={false}

                                        >
                                        </Column>
                                        {/* <Column
                                            formItem={{ visible: false }}
                                            dataField="brandId"
                                            caption="brandId"
                                            allowSorting={false}>
                                            <RequiredRule />
                                        </Column> */}
                                        <Column
                                            dataField="brandName"
                                            caption="brandName"
                                            allowSorting={true}
                                        >
                                            <Lookup dataSource={brandsList}
                                                displayExpr="name"
                                                valueExpr="name"
                                            //onValueChanged={onValueChangedLookupCars}

                                            />
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="modelName"
                                            caption="modelName"
                                            allowSorting={false}>
                                            <RequiredRule />
                                        </Column>
                                        {/* <MasterDetail enabled component={RolesInfo} /> */}
                                        <Scrolling useNative />
                                    </DataGrid>
                                </Stack>
                            </>,
                        },
                        {
                            label: "Cars",
                            component: <> <Form>
                                <Stack gap={3} direction="vertical" className="justify-content-center ">
                                    <DataGrid

                                        className={"opacity"}
                                        dataSource={carsList}
                                        keyExpr="id"
                                        focusedRowEnabled
                                        showBorders
                                        rowAlternationEnabled
                                        // className={styles['receivers-grid']}
                                        //onRowInserting={handleRowInsertingCars}
                                        // onRowRemoved={this.handleRowRemoving}
                                        // onRowUpdating={this.handleRowUpdating}
                                        //onRowPrepared={handleRowPreparedCars}
                                        onEditingStart={onEditingStartCars}
                                        // onEditCanceling={() => this.setState({ editing: true })}
                                        allowColumnResizing
                                        onEditorPreparing={onEditorPreparingCars}
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
                                            formItem={{ visible: false }}
                                            dataField="id"
                                            caption="id"
                                            allowSorting={false}

                                        >
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="brandName"
                                            caption="brandName"
                                            allowSorting={false}>
                                            <Lookup dataSource={brandsList}
                                                displayExpr="name"
                                                valueExpr="name"
                                                ref={a}
                                            />
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="modelName"
                                            caption="modelName"
                                            allowSorting={false}>
                                            <Lookup dataSource={modelsList}
                                                displayExpr="modelName"
                                                valueExpr="modelName"
                                            />
                                            <RequiredRule />
                                        </Column>
                                        <Column
                                            dataField="parkingCost"
                                            caption="parkingCost"
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
                            </Form></>,
                        },
                        {
                            label: "Parking",
                            component: <> <Form>
                                <Stack gap={3} direction="vertical" className="justify-content-center ">
                                    <DataGrid
                                        className={"opacity"}
                                        dataSource={parkingsList}
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
                                            formItem={{ visible: false }}
                                            dataField="id"
                                            caption="id"
                                            allowSorting={false}

                                        >
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="carId"
                                            caption="carId"
                                            allowSorting={false}>
                                            <Lookup dataSource={carsList}
                                                displayExpr="id"
                                                valueExpr="id" />
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="dateEntry"
                                            caption="dateEntry"
                                            allowSorting={false}>
                                            {/* <Lookup dataSource={tasks}
                        displayExpr="name"
                        valueExpr="id" /> */}
                                            <RequiredRule />
                                        </Column>
                                        <Column dataField="expectedDateExit"
                                            caption="expectedDateExit"
                                            allowSorting={false}>

                                            <RequiredRule />
                                        </Column>
                                        <Column
                                            dataField="actualDateExit"
                                            caption="actualDateExit"
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
                            </Form></>,
                        }
                    ]}

                />
            </Container>
        </div >

    );
};

export default OperatorPage;
