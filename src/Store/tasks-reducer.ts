import {TaskType} from "../TodoList";
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT
export const tasksReducer = (state: TasksStateType, action: ActionType):
    TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [{id: v1(), isDone: false, title: action.title}, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistID]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}