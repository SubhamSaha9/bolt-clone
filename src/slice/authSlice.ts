import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
    openDialog: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            localStorage.setItem("user", JSON.stringify(value.payload));
        },
        setToken(state, value) {
            localStorage.setItem("token", JSON.stringify(value.payload));
            state.token = value.payload;
        },
        logout(state){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.user = null;
            state.token = null;
        },
        setOpenDialog(state, value){
            state.openDialog = value.payload;
        }
    },
});

export const { setUser, setToken, setOpenDialog, logout } = authSlice.actions;
export default authSlice.reducer;