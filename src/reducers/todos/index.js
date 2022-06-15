import TodosServices from "../../services/todos.services";

const GET_TODOS_REQUEST = "GET_TODOS_REQUEST"
const GET_TODOS_RESPONSE = "GET_TODOS_RESPONSE"
const GET_TODOS_ERROR = "GET_TODOS_ERROR"

const ADD_TODO_REQUEST = "ADD_TODO_REQUEST"
const ADD_TODO_RESPONSE = "ADD_TODO_RESPONSE"
const ADD_TODO_ERROR = "ADD_TODO_ERROR"

const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST"
const DELETE_TODO_RESPONSE = "DELETE_TODO_RESPONSE"
const DELETE_TODO_ERROR = "DELETE_TODO_ERROR"

const DELETE_ALL_TODO_REQUEST = "DELETE_ALL_TODO_REQUEST"
const DELETE_ALL_TODO_RESPONSE = "DELETE_ALL_TODO_RESPONSE"
const DELETE_ALL_TODO_ERROR = "DELETE_ALL_TODO_ERROR"

const UPDATE_ALL_TODO_REQUEST = "UPDATE_ALL_TODO_REQUEST"
const UPDATE_ALL_TODO_RESPONSE = "UPDATE_ALL_TODO_RESPONSE"
const UPDATE_ALL_TODO_ERROR = "UPDATE_ALL_TODO_ERROR"

const defaultState = {
    todos: [],
    loading: false,
    error: ''
}

export default function todosReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_TODOS_RESPONSE:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case GET_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_TODO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_TODO_RESPONSE:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case ADD_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_TODO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_TODO_RESPONSE:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case DELETE_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_ALL_TODO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ALL_TODO_RESPONSE:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case DELETE_ALL_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_ALL_TODO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ALL_TODO_RESPONSE:
            return {
                ...state,
                todos: action.payload,
                loading: false
            }
        case UPDATE_ALL_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}
// GET TODOS
const getTodosRequest = () => ({type: GET_TODOS_REQUEST})
const getTodosResponse = (todos) => ({type: GET_TODOS_RESPONSE, payload: todos})
const getTodosError = (error) => ({type: GET_TODOS_ERROR, payload: error})

// ADD TODO
const addTodoRequest = () => ({type: ADD_TODO_REQUEST})
const addTodoResponse = (todos) => ({type: ADD_TODO_RESPONSE, payload: todos})
const addTodoError = (error) => ({type: ADD_TODO_ERROR, payload: error})

// DELETE TODO
const deleteTodoRequest = () => ({type: DELETE_TODO_REQUEST})
const deleteTodoResponse = (todos) => ({type: DELETE_TODO_RESPONSE, payload: todos})
const deleteTodoError = (error) => ({type: DELETE_TODO_ERROR, payload: error})

// DELETE ALL TODO
const deleteAllTodoRequest = () => ({type: DELETE_ALL_TODO_REQUEST})
const deleteAllTodoResponse = (todos) => ({type: DELETE_ALL_TODO_RESPONSE, payload: todos})
const deleteAllTodoError = (error) => ({type: DELETE_ALL_TODO_ERROR, payload: error})

// UPDATE TODO
const updateTodoRequest = () => ({type: UPDATE_ALL_TODO_REQUEST})
const updateTodoResponse = (todos) => ({type: UPDATE_ALL_TODO_RESPONSE, payload: todos})
const updateTodoError = (error) => ({type: UPDATE_ALL_TODO_ERROR, payload: error})

export const getTodosAction = () => {
    return async (dispatch) => {
        try{
            dispatch(getTodosRequest())
            const res = await TodosServices.getTodos()
            if(!res.todos) {
                dispatch(getTodosError('something went wrong'))
                throw new Error('something went wrong')
            }
            dispatch(addTodoError(''))
            dispatch(getTodosResponse(res.todos))

        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const addTodosAction = ({title, description, todos}) => {
    return async (dispatch) => {
        try{
            dispatch(addTodoRequest())
            const res = await TodosServices.addTodo({title, description})
            if(!res.todo) {
                dispatch(addTodoError('something went wrong'))
                throw new Error('something went wrong')
            }
            dispatch(addTodoError(''))
            dispatch(addTodoResponse(todos.concat(res.todo)))

        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteTodoAction = ({todoId, todos}) => {
    return async (dispatch) => {
        try{
            dispatch(deleteTodoRequest())
            const res = await TodosServices.deleteTodo({todoId})
            if(!res.message) {
                dispatch(deleteTodoResponse('something went wrong'))
                throw new Error('something went wrong')
            }
            dispatch(deleteTodoError(''))
            dispatch(deleteTodoResponse(todos.filter(item => item._id !== todoId)))

        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteAllTodoAction = () => {
    return async (dispatch) => {
        try{
            dispatch(deleteAllTodoRequest())
            const res = await TodosServices.deleteAllTodos()
            if(!res.message) {
                dispatch(deleteAllTodoResponse('something went wrong'))
                throw new Error('something went wrong')
            }
            dispatch(deleteAllTodoError(''))
            dispatch(deleteAllTodoResponse([]))

        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const updateTodoAction = ({todoId, body, index, todos}) => {
    return async (dispatch) => {
        try{
            dispatch(updateTodoRequest())
            const res = await TodosServices.updateTodo({todoId, body})
            if(!res.todo) {
                dispatch(updateTodoResponse('something went wrong'))
                throw new Error('something went wrong')
            }
            dispatch(updateTodoError(''))
            todos[index] = res.todo
            const newTodos = []
            for (let i = 0; i < todos.length; i++) {
                newTodos.push(todos[i])
            }
            dispatch(updateTodoResponse(newTodos))

        }
        catch (e) {
            console.log(e.message)
        }
    }
}
