import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { Contact } from "../types";

const initialState :{
    contacts: Contact[],
    contact: Contact | null,
} = {
    contacts: [],
    contact: null
}

const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers: {
        setContacts: (state,action) => {
            state.contacts = action.payload
        }
    }
})


export const { setContacts } = contactSlice.actions
export default contactSlice.reducer