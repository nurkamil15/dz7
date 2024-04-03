import React, {useEffect, useRef, useState} from 'react';
import Todo from "../../components/todo/Todo";
import todo from "../../components/todo/Todo";

function TodoPage() {
    const [input, setInput] = useState("")
    const [lists, setLists] = useState([])

    async function getTodoLists() {
        const response = await fetch('http://localhost:8000/lists');
        const data = await response.json()
        setLists(data)
    }

    function changeInput (event) {
        setInput(event.target.value)

    }
    const valueInput = useRef(null)
    const emptyInput =() =>{
        console.log(valueInput)
        valueInput.current.value=''
        setInput('')
    }

    async function createTodo (event) {
        event.preventDefault()
        const data = {
            title: input,
            status: false
        }

        const response = await fetch('http://localhost:8000/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        getTodoLists()
        emptyInput()

    }

    async function changeStatus (event) {
        const checked = event.target.checked
        const id = event.target.value
        const data = {
            status: checked
        }
        const response = await fetch(`http://localhost:8000/lists/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        getTodoLists()

    }


    useEffect(() => {
        getTodoLists()
    }, [])


    const deleteTodo= async (e) =>{
        const id = e.target.value

        const data = {
            id:id
        }

        const response = await fetch(`http://localhost:8000/lists/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },

        })
        getTodoLists()
    }


    return (
        <div>
            <form onSubmit={createTodo}>
                <input type="text" onChange={changeInput} ref={valueInput} />
                <button type="submit">create</button>
            </form>
            <ul>
                {
                    lists.length > 0
                        ?
                        lists.map(el => <Todo key={el.id} todo={el} changeStatus={changeStatus}  deleteTodo={deleteTodo}/>)
                        :
                        <li>нет дел</li>
                }
            </ul>
        </div>
    );
}

export default TodoPage;