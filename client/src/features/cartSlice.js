import  { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    items: []
}

export const fetchCartItems = createAsyncThunk('cart/fetchedItems', async () => {
    const items = JSON.parse(localStorage.getItem('cart')) || []

    return items
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addedTocart(state,action){
            const id = action.payload._id
            const result = state.items.some(single => single._id === id)
            if(result){
                return;
            } else {
                state.items.push({ ...action.payload, quantity: 1})
                localStorage.setItem('cart',JSON.stringify(state.items))
            }
            
        },
        changeQuantity(state,action){
            const { id, buttonaction} = action.payload
            const changedArr = state.items && state.items.filter( single => single._id === id)[0]
            buttonaction === 'inc' ? ++changedArr.quantity : --changedArr.quantity
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        deleteCartItems(state,action){
            state.items = state.items.filter(single => single._id !== action.payload)
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        emptyCart(state,action){
            state.items = []
            localStorage.removeItem('cart')
        },
    },
    extraReducers: {
        [fetchCartItems.pending]: (state,action) => {
            state.status = 'loading'
        },
        [fetchCartItems.fulfilled]: (state,action) => {
            state.status = 'success'
            state.items = state.items.concat(action.payload)
        },
        [fetchCartItems.pending]: (state,action) => {
            state.status = 'something went wrong'
        },
    }
})

export const { addedTocart,changeQuantity,deleteCartItems,emptyCart } = cartSlice.actions
export default cartSlice.reducer