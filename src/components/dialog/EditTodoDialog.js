import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import React from "react";
import {updateTodoAction} from "../../reducers/todos";
import {useDispatch, useSelector} from "react-redux";

const EditTodoDialog = ({open, handleClose, todo, index}) => {
    const dispatch = useDispatch()

    const todos = useSelector(state => state.todos.todos)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const updateTodo = ({todoId, index, title, description}) => {
        dispatch(updateTodoAction({todoId, index, todos, body: {title, description}}))
    }

    useEffect(() => {
        if(todo) {
            setTitle(todo.title ?? '')
            setDescription(todo.description ?? '')
        }
    },[todo])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Edit"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    placeholder={'Title'}
                    variant={'outlined'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    placeholder={'Description'}
                    variant={'outlined'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Disagree
                </Button>
                <Button
                    disabled={!title || !description}
                    onClick={() => {
                    handleClose()
                    updateTodo({todoId: todo._id, index, title, description})
                }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditTodoDialog