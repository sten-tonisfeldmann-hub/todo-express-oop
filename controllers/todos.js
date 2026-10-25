import{ Todo } from '../models/todo.js';
import { FileManager } from '../utils/files.js';

class todoController {
    constructor() {
        this.TODOS = [];
    }

    async createTodo(req, res){
        const task = req.body.task;
        const todoData = await FileManager.readFile('./data/todos.json');

        if (todoData) {
            this.TODOS = todoData;
        } else {
            this.TODOS = [];
        }

        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo);
        await FileManager.writeFile('./data/todos.json', this.TODOS);
        res.json({
            message: "Created new todo object",
            newTask: newTodo
        });
    }
    
    async getTodos(req, res){
        const todoData = await FileManager.readFile('./data/todos.json');
        this.TODOS = todoData || [];
        res.json({tasks: this.TODOS})};
    
    async updateTodo(req, res){
        const todoId = req.params.id;
        const updatedTask = req.body.task;

        const todoData = await FileManager.readFile('./data/todos.json');
        this.TODOS = todoData || [];
        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId);

        if(todoIndex < 0){
            res.json({message: "Could not find todo with the given index"})
            return;
        }
        
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        await FileManager.writeFile('./data/todos.json', this.TODOS);
        res.json({
            message: "Updated todo object",
            updatedTask: this.TODOS[todoIndex]
        });

    }

    async deleteTodo(req, res){
        const todoId = req.params.id;
        const todoData = await FileManager.readFile('./data/todos.json');
        this.TODOS = todoData || [];
        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId);

        if (todoIndex < 0) {
            return res.json({ message: "Could not find todo with the given index" });
        }

        const deletedTodo = this.TODOS.splice(todoIndex, 1)[0];
        await FileManager.writeFile('./data/todos.json', this.TODOS);
        res.json({
            message: "Deleted todo object",
            deletedTask: deletedTodo
        });
    }
}

export const TodoController = new todoController();