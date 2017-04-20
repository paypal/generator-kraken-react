import { 
    GET_TASKS_SUCCESS,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS 
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_TASKS_SUCCESS:
            return [ ...action.payload.tasks]
        case CREATE_TASK_SUCCESS:
            return [...state, action.payload.task]
        case DELETE_TASK_SUCCESS:
            return [ ...action.payload.tasks]
        default:
            return state;
    }
}