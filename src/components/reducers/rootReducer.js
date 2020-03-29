import list from "../../storage/list.json"

// state must be initialized
const initState = {
    list: list
}

const rootReducer = (state = initState, action) => {
    return state;
}

export default rootReducer;