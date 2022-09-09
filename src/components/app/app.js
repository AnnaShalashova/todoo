import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {

  maxId = 100;

  state = {
    TodoData: [
      this.createItem("Drink Coffee"),
      this.createItem("Make Awesome App"),
      this.createItem("Have a lunch")
    ],
    term: "",
    filter: "All"
  };

  createItem(label) {
    return {
      label, 
      important: false,
      done: false, 
      id: this.maxId++
    };
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = {...oldItem, 
        [propName]: !oldItem[propName]};
      return [
         ...arr.slice(0, idx),
         newItem,
         ...arr.slice(idx + 1)
       ];
  };

  onToggleDone = (id) => {
    this.setState(({ TodoData }) => {
       return {
        TodoData: this.toggleProperty(TodoData, id, "done")
       }
    });   
  };

  onToggleImportant = (id) => {
    this.setState(({ TodoData }) => {
      return {
       TodoData: this.toggleProperty(TodoData, id, "important")
      }
   }); 
  };

  deleteItem = (id) => {
    this.setState(({ TodoData }) => {
      const idx = TodoData.findIndex((el) => el.id === id);

      const newArray = [
        ...TodoData.slice(0, idx),
        ...TodoData.slice(idx + 1)
      ];

      return {
        TodoData: newArray
      };
    });
  };

  addItem = (text) => {   
    const newItem = this.createItem(text);

    this.setState(({ TodoData }) => {
      const newArr = [
        ...TodoData,
        newItem
      ];
      return {
        TodoData: newArr
      };
    });
  };

  searchChange = (searchChange) => {
    this.setState({
      term: searchChange
    });
  };

  search = (items, term) => {
    if (term === 0) {
      return items;
    }
   return items.filter((item) => item.label.toLowerCase().includes(term.toLowerCase()));
  };

  filterChange = (name) => {
    this.setState({
      filter: name
    });
  };


  filterItems = (arr, filter) => {
    switch(filter) {
      case "All":
        return arr;
      case "Active":
        return arr.filter((el) => !el.done);
      case "Done":
        return arr.filter((el) => el.done);
      default: 
        return arr;
    }
  };

  render() {
    const { TodoData, term, filter } = this.state;
    const visible = this.filterItems(this.search(TodoData, term), filter);
    const doneCount = TodoData.filter((el) => el.done).length;
    const todoCount = TodoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel 
          onIncludes={ this.searchChange }/>
          <ItemStatusFilter 
          filter={ filter }
          filterItem={ this.filterChange }/>
        </div>
      
        <TodoList 
        todos={ visible } 
        onDeleted={ this.deleteItem }
        onToggleDone={ this.onToggleDone }
        onToggleImportant={ this.onToggleImportant }/>
        
        <AddItem 
        addItem={ this.addItem }/>
        
    </div>
    );
  }
};
