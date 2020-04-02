import list from "../../storage/list.json"

// state must be initialized
const initState = {
    list: list
}

const rootReducer = (state = initState, action) => {
    console.log('action', action)
    if (action.type === 'DELETE_ITEM') {
        let newList = state.list.filter(l => l.id !== action.id)
        return {
            list: newList
        };
    }
    if (action.type === 'ADD_ITEM') {
        return {
            list: [...state.list, action.newObj] 
        };
    }    

    if (action.type === 'EDIT_ITEM') {
        let newList = state.list;
        let i = newList.findIndex(l => l.id===action.id);
        newList[i].value = action.value;
        return {
            list: newList
        };
    }    
    return state;
}

export default rootReducer;