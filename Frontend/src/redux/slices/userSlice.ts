import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../Models/IUser";
import IJwtToken from "../../Models/IJwtToken";
import IUserInfo from "../../Models/IUserInfo";

let initialState = {
    token: null,
    userInfo: null,
    IsOperator:false,
} as IUser;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state: IUser, action: PayloadAction<IUserInfo>) {
            state.userInfo = action.payload;
        },
        setToken(state: IUser, action: PayloadAction<IJwtToken>) {
            state.token = action.payload;
        },
        setIsOperator(state:IUser,action:PayloadAction<boolean>){
            state.IsOperator=action.payload;
        }
    }
});

export default userSlice.reducer;

export const { setUser, setToken, setIsOperator } = userSlice.actions;
