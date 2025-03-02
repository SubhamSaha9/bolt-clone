import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openSheet: false,
    navAction: null,
};

const authSlice = createSlice({
    name: "action",
    initialState: initialState,
    reducers: {
        setOpenSheet(state, value) {
            state.openSheet = value.payload;
        },
        setNavAction(state, value) {
            state.navAction = value.payload;
        },
    },
});

export const { setOpenSheet, setNavAction } = authSlice.actions;
export default authSlice.reducer;