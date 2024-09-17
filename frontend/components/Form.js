import React from 'react';

export default class Form extends React.Component {
  state = {
    name: '',
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.props.addTodo(this.state.name)
    this.setState({
      ...this.state,
      name: ''
    })
  } 
  onChange = evt => {
    const { value } = evt.target
    this.setState({
      ...this.state,
      name: value
    })
  }


  render() {
    return (
      <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
        <input
          value={this.props.todoNameInput}
          onChange={this.props.onTodoNameInputChange}
          type="text"
          placeholder="Type todo"
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={this.props.clearCompleted}>
          Show Completed
        </button>
      </form>
      
      
    );
  }
} 

