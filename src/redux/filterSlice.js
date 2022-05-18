import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        price: [0, 500],
        color: "",
        sizes: "All",
        category: "All",
    },
    reducers: {
        setAllFilter: (state, action) => {
            state.price = action.payload.price
            state.color = action.payload.color
            state.sizes = action.payload.sizes
            state.category = action.payload.category
        },
        setPriceFilter: (state, action) => {
            state.price = action.payload
        },
        setColorFilter: (state, action) => {
            state.color = action.payload
        },
        setSizesFilter: (state, action) => {
            state.sizes = action.payload
        },
        setCategoryFilter: (state, action) => {
            state.category = action.payload
        },
        resetAllFilter: (state) => {
            state.price = [0, 500]
            state.color = "white"
            state.sizes = "All"
            state.category = "All"
        }
    }
})

export const {
    setAllFilter,
    setPriceFilter,
    setColorFilter,
    setSizesFilter,
    setCategoryFilter,
    resetAllFilter
} = filterSlice.actions

export default filterSlice.reducer