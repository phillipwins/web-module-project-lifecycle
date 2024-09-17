import React from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  };

  onTodoNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ todoNameInput: value });
  };

  resetForm = () => this.setState({ todoNameInput: '' });

  setAxiosResponseError = (err) => {
    this.setState({
      error: err.response ? err.response.data.message : 'An error occurred',
    });
  };

  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.todoNameInput })
      .then((res) => {
        this.fetchAllTodos();
        this.resetForm();
      })
      .catch(this.setAxiosResponseError);
  };

  onTodoFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.todoNameInput.trim()) {
      this.postNewTodo();
    } else {
      this.setState({ error: 'Todo name cannot be empty' });
    }
  };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ todos: res.data.data, error: '' });
      })
      .catch(this.setAxiosResponseError);
  };

  toggleCompleted = (id) => {
    const patchURL = `${URL}/${id}`;
    axios
      .patch(patchURL)
      .then((res) => {
        this.setState((prevState) => ({
          todos: prevState.todos.map((todo) =>
            todo.id === id ? res.data.data : todo
          ),
        }));
      })
      .catch(this.setAxiosResponseError);
  };

  clearCompleted = () => {
    const incompleteTodos = this.state.todos.filter(
      (todo) => !todo.completed
    );
    this.setState({ todos: incompleteTodos });
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        {this.state.error && <div id="error">Error: {this.state.error}</div>}
        <TodoList
          todos={this.state.todos}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          todoNameInput={this.state.todoNameInput}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
