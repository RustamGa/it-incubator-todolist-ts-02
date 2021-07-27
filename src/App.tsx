import React, {useState} from 'react'
import './App.css'
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType> // мы не кол-во нро знаем св-во
}

const App = () => {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListID_1, title: "What to learn", filter: "all"},
            {id: todoListID_2, title: "What to buy", filter: "all"},
        ]
    )
    const [tasks, setTasks] = useState<TasksStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
            ],
            [todoListID_2]: [
                {id: v1(), title: "Beer", isDone: false},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: false},
            ],
        }
    )


    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks}) // копируем таски для того чтоб реакт видел что пришел новый объект
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks [todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID]
            .map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists((todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
        // UI
    const getTasksForRender = (todoList: TodoListType): TaskType[] => { // после двоеточия указывваем что получаем на выходе ретурн
        switch (todoList.filter) { // оператор похожий на иф элс
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    // let tasksForRender = tasks
    // if(filter === "active"){
    //     tasksForRender = tasks.filter(t => !t.isDone)
    // }
    // if(filter === "completed"){
    //     tasksForRender = tasks.filter(t => t.isDone)
    // }

const todoListComponents = todoLists.map(tl => {
    return (
        <TodoList
            key={tl.id} // не надо прописывать в пропсах, это чисто техническое свойство
            id={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={getTasksForRender(tl)}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeTodoListFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
        />
    )
})

    // UI:
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
