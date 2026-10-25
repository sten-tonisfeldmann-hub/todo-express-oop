import{ Todo } from '../models/todo.js';

class todoController {
    constructor() {
        this.TODOS = [];
    }

    createTodo(req, res){
        const task = req.body.task;
        const newTodo = new Todo(Math.random(). toString(), task)
        this.TODOS.push(newTodo);
        res.json({
            message: "Created new todo object",
            newTask: newTodo
        });
    }
    
    getTodos(req, res){
        res.json({tasks: this.TODOS})};
    
    updateTodo(req, res){
        const todoId = req.params.id;
        const updatedTask = req.body.task;

        console.log(req.body);
        console.log(req.params);

        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId);

        if(todoIndex < 0){
            res.json({message: "Could not find todo with the given index"})
            throw new Error("Could not find the todo");
        }
        
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        res.json({
            message: "Updated todo object",
            updatedTask: this.TODOS[todoIndex]
        });

    }}

export const TodoController = new todoController();