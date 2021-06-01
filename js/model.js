export default class Model 
{
    constructor() 
    {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        // Si no existe la lista o está vacia, crea un objeto para la misma.
        if (!this.todos || this.todos.length < 1)
        {
            this.todos = [ // Primer elemento de la lista (Por defecto)
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS Tutorials',
                    completed: false
                }
            ];
            this.currentId = 1;
        }
        else
        {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setView(view) 
    {
        this.view = view;
    }

    save()
    {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        
    }

    getTodos()
    {
        return this.todos;
    }

    findTodo(id)
    {
        return this.todos.findIndex((todo) => todo.id === id); // Busco un indice(coincide cuando())
    }

    toggleCompleted (id)
    {
        const todo = this.todos[this.findTodo(id)];
        todo.completed = !todo.completed;
        this.save();
    }

    addTodo(title, description) 
    {
        const todo =
        {
            id: this.currentId++,
            title,
            description,
            completed: false,
        }

        this.todos.push(todo);
        this.save();

        return { ...todo };
    }

    removeTodo(id)
    {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }
}