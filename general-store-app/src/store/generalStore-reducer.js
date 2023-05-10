import { createSlice } from "@reduxjs/toolkit";

const initialStoreItems = { items: []};

const generalStoreSlice = createSlice({
  name: "generalStore",
  initialState: initialStoreItems,
  reducers: {
    updateStoreItems(state, action) {
      state.storeItems = action.payload;
    },
    addingNewStoreItems(state,action)
    {
      console.log('adding new expense',action.payload)
      state.items=[...state.items,action.payload]
    },
    edditingStoreItems(state,action)
    {
      let filteredArr=state.items.filter((arr)=>arr.Id !==action.payload);
      state.items=filteredArr;
    },
    
  },
});

export const generalStoreAction = generalStoreSlice.actions;
export default generalStoreSlice.reducer;