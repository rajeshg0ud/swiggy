import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const loadState=()=>{
    try{
        const serializedState=localStorage.getItem("item");
        if(!serializedState){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch (err) {
        console.error("Error loading state from local storage:", err);
        return undefined;
    }
}

const saveState=(state)=>{
    try{
        const serializedState= JSON.stringify(state)
        localStorage.setItem( "item",serializedState);
    }catch (err) {
        console.error("Error saving state to local storage:", err);
        return undefined;
    }

}

const initialState={
    userInfo:{},
    restInfo:{},
    items:[],
    address:{},
}

const persistedState = loadState();

if (persistedState) {
    initialState.restInfo = persistedState.restInfo || {};
    initialState.items = persistedState.items || [];
    initialState.address = persistedState.address || {};
    initialState.userInfo = persistedState.userInfo || {};

} else {
    saveState(initialState);
}


const CartSlice= createSlice({
    name:'CartSlice',
    initialState:initialState,
    reducers:{
        addToCart:(state, action)=>{
            const {id,itemId, itemName, itemPrice}= action.payload
            if(state.items.length>0){
                if(state.restInfo.id!== id){
                    toast.error("Add items from the same Restaurant");
                    return
                }
                else{
                    const exisitingItem= state.items.find((item)=> item.itemId == itemId);
                    
                    if(exisitingItem){ 
                        exisitingItem.quantity+=1;
                        
                        const updatedItems= state.items.map(item =>
                            item.id=== itemId ? exisitingItem : item
                        )

                        state.items=updatedItems;
                    }
                    else{
                        state.items.push({itemId, itemName, itemPrice, quantity:1})
                    }
                }
            }
            else{
                state.restInfo={
                    id: action.payload.id,
                    resImageId: action.payload.resImageId,
                    resName: action.payload.resName,
                    area: action.payload.area,
                    city: action.payload.city
                };

                state.items.push({itemId, itemName, itemPrice, quantity:1})
                 
            }

            saveState(state)
            
        },
        removeFromCart: (state, action) => {
            // Ensure action.payload and itemId exist
            if (!action.payload || !action.payload.itemId) {
                console.error('Payload or itemId is missing');
                return;
            }
        
            const { itemId } = action.payload;
        
            // Check if state.items is not null or undefined
            if (!state.items) {
                console.error('State items is missing');
                return;
            }
        
            // Map through items and modify quantities
            const items = state.items.map((item) => {
                if (item && item.itemId === itemId) { // Ensure item is not null
                    console.log(itemId);
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null;
                    }
                }
                return item; // Return item if it does not match
            });
        
            // Filter out null items
            state.items = items.filter(item => item !== null);
        
            saveState(state);
        },

        clearCart:(state)=>{
            state.items=[]

            saveState(state)
        },

        updateAddress:(state, action)=>{
           
            state.address={
                area: action.payload.area,
                city:action.payload.city,
                pincode:action.payload.pincode,
                state: action.payload.state,
            }
            console.log(state.address)

            saveState(state)
        },
        addUserInfo:(state, action)=>{

            state.userInfo= action.payload;

            saveState(state)
        }
        
    }
})


export const {addToCart, removeFromCart, clearCart, updateAddress, addUserInfo}=CartSlice.actions;

export default CartSlice.reducer;