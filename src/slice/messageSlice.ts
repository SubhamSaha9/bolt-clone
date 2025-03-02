import { createSlice } from "@reduxjs/toolkit";
import Lookup from "../utils/Lookup";

const initialState = {
    messages: null,
    files: Lookup.DEFAULT_FILE,
};

const authSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setMessages(state, value) {
            state.messages = value.payload;
        },
        setFiles(state, value) {
            state.files = value.payload;
        },
    },
});

export const { setMessages, setFiles } = authSlice.actions;
export default authSlice.reducer;