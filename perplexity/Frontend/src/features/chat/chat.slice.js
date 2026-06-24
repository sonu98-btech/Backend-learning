import { createSlice } from '@reduxjs/toolkit'
export const chatSlice = createSlice({
    name:"chat",
    initialState:{
    chats: [],
    currentChatId: null,
    messages: [],
    loading: false,
    IsGenerating:false
    },
    reducers:{
        setChats:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setMessages:(state,action)=>{
            state.messages =action.payload
        },
        addChat:(state,action)=>{
            state.chats.push(action.payload)
        },
        addMessage:(state,action)=>{
            state.messages.push(action.payload)
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setIsGenerating:(state,action)=>{
            state.IsGenerating=action.payload
        }

    }

})
    export const{setChats,setCurrentChatId,setLoading,setError,setMessages,addMessage,addChat,setIsGenerating} =chatSlice.actions
    export default chatSlice.reducer
