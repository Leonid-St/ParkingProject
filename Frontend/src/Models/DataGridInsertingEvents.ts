import { dxElement } from "devextreme/core/element";
import dxDataGrid from "devextreme/ui/data_grid";

export interface DataGridRowInsertingEvent<T> {
    cancel?: boolean | Promise<void> | any;
    component?: dxDataGrid | undefined;
    data?: T;
    element?: dxElement | undefined;
}
export default DataGridRowInsertingEvent;
