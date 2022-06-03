import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Container, Stack } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
import IParking from "../../Models/IParking";
import DataGridRowInsertingEvent from "../../Models/DataGridInsertingEvents";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";


interface personalModel {
    carId: string;
    brandName: string;
    modelName: string;
}

const PersonalPage: React.FunctionComponent = () => {

    let [brandsList, setBrandsList] = useState<IBrand[]>();
    let [modelsList, setModelsList] = useState<IModel[]>();
    let [carsList, setCarsList] = useState<ICar[]>();
    let [parkingsList, setParkingsList] = useState<IParking[]>();
    let [editing, setEditing] = useState<boolean>(true);
    const [personalList, setPersonalList] = useState<personalModel[]>([]);
    let history = useHistory();
    let dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.user.userInfo?.id);
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
    useEffect(() => {
        setPersonalList((() => {
            if (carsList) {
                if (brandsList) {
                    if (modelsList) {
                        return carsList.map((c: ICar) => {
                            return {
                                carId: c.id,
                                brandName: brandsList!.filter((f) => f.id === c.brandId)[0].name,
                                modelName: modelsList!.filter((f) => f.id === c.modelId)[0].modelName ?? []
                            };
                        });
                    }
                }

            }
            return [];
        }));
    }, [brandsList, carsList, modelsList])
    const handleRowInserting = (e: DataGridRowInsertingEvent<personalModel>) => {
        console.log(e.data);
        if (e.data && userId) {
            // userId: string;
            // brandName: string;
            // modelName: string;
            api.car.postNewCar({ userId: userId, brandName: (e.data as any).brand, modelName: (e.data as any).model });
        }
        setEditing(true);

    };

    // const handleRowInsertingBrand = (e: DataGridRowInsertingEvent<IBrand>) => {
    //     if (e.data) {
    //         api.brand.postNewBrand(e.data);
    //     }

    // };
    // const handleRowInsertingCars = (e: DataGridRowInsertingEvent<ICar>) => {
    //     if (e.data) {
    //         api.car.postNewCar(e.data);
    //     }

    // };
    // const handleRowRemovingModels = (e: DataGridRowInsertingEvent<IModel>) => {
    //     if (e.data) {
    //         api.models._deleteModels(e.data);
    //     }

    // };
    // const handleRowRemovingBrands = (e: DataGridRowInsertingEvent<IBrand>) => {
    //     if (e.data) {
    //         api.brand._deleteBrand(e.data);
    //     }

    // };
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
                <h1 style={{ justifyContent: "top", textAlign: "center" }} className="aqua shadow">PERSONAL PAGE</h1>
                <>

                    <Form>

                        <Stack gap={3} direction="vertical" className="justify-content-center ">
                            <DataGrid
                                className={"opacity"}
                                dataSource={personalList}
                                keyExpr="carId"
                                focusedRowEnabled
                                showBorders
                                rowAlternationEnabled
                                // className={styles['receivers-grid']}
                                onRowInserting={handleRowInserting}
                                //onRowRemoved={handleRowRemovingBrands}
                                // onRowUpdating={this.handleRowUpdating}
                                // onRowPrepared={this.handleRowPrepared}
                                // onEditingStart={this.onEditingStart}
                                //onEditCanceling={() => this.setState({ editing: true })}
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
                                {/* <Column
                                    formItem={{ visible: false }}
                                    dataField="id"
                                    caption="id"
                                    allowSorting={false}

                                >
                                </Column> */}
                                <Column
                                    formItem={{ visible: false }}
                                    dataField="carId"
                                    caption="carId"
                                    allowSorting={false}

                                >
                                    <Lookup dataSource={carsList}
                                        displayExpr="id"
                                        valueExpr="id"

                                    />

                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="model"
                                    caption="model"
                                    allowSorting={false}
                                >
                                    <Lookup dataSource={modelsList}
                                        displayExpr="modelName"
                                        valueExpr="id"
                                    />
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="brand"
                                    caption="brand"
                                    allowSorting={false}
                                >
                                    <Lookup dataSource={brandsList}
                                        displayExpr="name"
                                        valueExpr="name"

                                    />
                                    <RequiredRule />
                                </Column>


                                {/* <MasterDetail enabled component={RolesInfo} /> */}
                                <Scrolling useNative />
                            </DataGrid>
                        </Stack>
                    </Form></>,
            </Container>
        </div >

    );
};

export default PersonalPage;
