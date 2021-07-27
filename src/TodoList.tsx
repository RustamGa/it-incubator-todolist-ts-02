import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    id:string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (nextFilter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus:(taskID: string, isDone: boolean, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>)=>
            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>х</button>
            </li>
        )
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addTask()}
const removeTodoList = () => props.removeTodoList(props.id)

    const errorMessage = error
        ? <div className={"error-text"}>Title is required!</div>
        : null

    return (
        <div>
            <h3>{props.title}<button onClick = {removeTodoList}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onTitleChangeHandler}
                    onKeyPress={onKeyHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList

