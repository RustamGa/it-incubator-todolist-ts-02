import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleType | ChangeTodoListFilterType
export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType):
    Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType =
                {
                    id: action.todolistID,
                    title: action.title,
                    filter: 'all'
                };
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = todolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [
                ...todolists
            ]
        }
        case'CHANGE-TODOLIST-FILTER':
            const todolist = todolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [
                ...todolists
            ]
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolistID: v1(), title: title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType,): ChangeTodoListFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
