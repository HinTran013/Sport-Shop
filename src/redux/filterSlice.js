import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        keyword: "",
        price: [0, 500],
        color: "",
        sizes: "All",
        category: "All",
    },
    reducers: {
        setAllFilter: (state, action) => {
            state.keyword = action.payload.keyword
            state.price = action.payload.price
            state.color = action.payload.color
            state.sizes = action.payload.sizes
            state.category = action.payload.category
        },
        setKeywordFilter: (state, action) => {
            state.keyword = action.payload
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
            //state.keyword = ""
            state.price = [0, 500]
            state.color = ""
            state.sizes = "All"
            state.category = "All"
        },
        resetKeywordFilter: (state) => {
            state.keyword = ""
        }
    }
})

export const {
    setAllFilter,
    setKeywordFilter,
    setPriceFilter,
    setColorFilter,
    setSizesFilter,
    setCategoryFilter,
    resetAllFilter,
    resetKeywordFilter,
} = filterSlice.actions

export default filterSlice.reducer