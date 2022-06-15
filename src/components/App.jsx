import React, {useEffect, useState} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {auth} from "../actions/user";
import Navbar from "./navbar/Navbar";
import Registration from "./authorization/Registration"
import Login from "./authorization/Login";
import {
    addTodosAction,
    deleteAllTodoAction,
    deleteTodoAction,
    getTodosAction,
    updateTodoAction
} from "../reducers/todos";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Delete from "@mui/icons-material/Delete"
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import './styles-template/_layout.scss'
import {EditTwoTone} from "@mui/icons-material";
import EditTodoDialog from "./dialog/EditTodoDialog";


function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const todos = useSelector(state => state.todos.todos)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [currentEditTodo, setCurrentEditTodo] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    const getTodos = () => {
        dispatch(getTodosAction())
    }
    const addTodo = () => {
        dispatch(addTodosAction({title, description, todos}))
    }
    const deleteTodo = (todoId) => {
        dispatch(deleteTodoAction({todoId, todos}))
    }
    const deleteAllTodo = () => {
        dispatch(deleteAllTodoAction())
    }
    const updateTodo = ({todoId, index, status}) => {
        dispatch(updateTodoAction({todoId, index, todos, body: {status: !status}}))
    }



    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const handleOpenEdit = (todo, index) => {
        setCurrentEditTodo(todo);
        setCurrentIndex(index)
        setOpenEditDialog(true);
    };
    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    useEffect(() => {
        dispatch(auth())
        getTodos()
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <div className="wrap">
                    {
                        !isAuth &&
                            <Routes>
                                <Route path="/registration" element={<Registration/>} />
                                <Route path="/login" element={<Login/>} />
                            </Routes>
                    }
                </div>
                <div className="appTodo">
                    {
                        isAuth &&
                        <>
                            <h2>Todo App</h2>
                            <div className="formTasks">
                                <div className="inputTasks">
                                    <input placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    <input placeholder={'Description'} value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className="addTodo">
                                    <Button onClick={addTodo}>+</Button>
                                </div>
                            </div>
                            { todos && todos.map((todo, index) => {
                                return (
                                    <div key={todo._id} className="todosList">
                                        <Checkbox checked={todo.status} onChange={() => {
                                            updateTodo({todoId: todo._id, index, status: todo.status})
                                        }}/>
                                        <div className="todo"
                                             style={{background: `${!todo.status ? 'red': '#fff'}`, cursor: 'pointer'}}
                                             >
                                            <div>
                                                <strong>Title: </strong>
                                                {todo.title}<br/>
                                                <strong>Description: </strong>
                                                {todo.description}
                                            </div>
                                        </div>
                                        <EditTwoTone className="btnEdit" onClick={ () => {
                                            handleOpenEdit(todo, index)
                                        }}/>

                                        <Delete
                                            className="delTodo"
                                            onClick={() => deleteTodo(todo._id)}
                                        >
                                            X
                                        </Delete>
                                    </div>
                                )
                            })
                            }
                            <div className="footerTasks">
                                <span className="colTasks">
                                    { `You have ${ todos.length } pending tasks` }
                                </span>
                                <Button className="clearAll" onClick={handleClickOpen}>
                                    Clear All
                                </Button>
                            </div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Delete all"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete all tasks?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Disagree
                                    </Button>
                                    <Button onClick={() => {
                                        handleClose()
                                        deleteAllTodo()
                                    }} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <EditTodoDialog open={openEditDialog} handleClose={handleCloseEdit} todo={currentEditTodo} index={currentIndex}/>

                        </>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
