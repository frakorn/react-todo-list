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
    return state;
}

export default rootReducer;