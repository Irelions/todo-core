import React, {Component} from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        };
    }


    deletedItem = (id) => {
        this.setState(({todoData}) => {
            const newArray = todoData.filter((element) => {
                return element.id !== id;
            });
            return {
                todoData: newArray,
            };
        });
    };

    addItem = (text) =>{
        const newItem = this.createTodoItem(text);
        this.setState(({todoData})=> {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray,
            };
        });
    };


    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((element) => element.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]}

       return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
                return{
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            }
        );
    }

    render() {
        const {todoData} = this.state;
        const doneCount = todoData.filter((element) => {return element.done}).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted = {(id) => {
                        this.deletedItem(id);
                    }}
                    onToggleImportant = {(id) => {
                        this.onToggleImportant(id)
                    }}
                    onToggleDone = {(id) => {
                        this.onToggleDone(id);
                    }}
                />

                <ItemAddForm addItem = {(label) => {
                    this.addItem(label);
                }}/>
            </div>
        );
    }
}