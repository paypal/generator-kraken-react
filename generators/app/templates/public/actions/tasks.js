import axios from 'axios';
import { 
    GET_TASKS_SUCCESS,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS
} from './types';


export const getTasks = () => dispatch => {
    axios
    .get('tasks')
    .then(res => {
        dispatch({
            type: GET_TASKS_SUCCESS,
            payload: {
                tasks: res.data.tasks
            }
        })
    })
}

export const addTask = (text, _csrf) => dispatch => {
    axios
    .post('tasks', {
        task: {
            text,
            isComplete: false
        },
        _csrf
    })
    .then(res => {
        dispatch({
            type: CREATE_TASK_SUCCESS,
            payload: {
                task: res.data.task
            }
        })
    })
}

export const deleteTask = (_id, _csrf) => (dispatch, getState) => {
    axios
    .delete(`tasks/${_id}`, { headers: { 'x-csrf-token': _csrf } })
    .then(res => {
        const tasks = getState().tasks.filter(task => task._id === _id ? false : true)
        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: {
                tasks
            }
        })
    })
}
