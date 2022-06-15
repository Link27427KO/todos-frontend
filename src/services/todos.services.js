import axios from "axios";

class TodosServices {
    getTodos(){
        return  axios.get('http://localhost:5000/api/todo', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(res => res.data)
            .catch(e => console.log(e.message))
    }
    addTodo({title, description}){
        return  axios.post('http://localhost:5000/api/todo', {
                title,
                description
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then(res => res.data)
            .catch(e => console.log(e.message))
    }
    deleteTodo({todoId}){
        return  axios.delete(`http://localhost:5000/api/todo/${todoId}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then(res => res.data)
            .catch(e => console.log(e.message))
    }
    deleteAllTodos(){
        return  axios.delete(`http://localhost:5000/api/todo/clear/all`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then(res => res.data)
            .catch(e => console.log(e.message))
    }

    updateTodo({todoId, body}){
        return  axios.put(`http://localhost:5000/api/todo/${todoId}`, body,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then(res => res.data)
            .catch(e => console.log(e.message))
    }
}

export default new TodosServices()