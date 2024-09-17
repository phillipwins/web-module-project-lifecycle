import React from 'react';

export default class Todo extends React.Component {
  // Handle the click event to toggle the completed status
  handleClick = () => {
    this.props.toggleCompleted(this.props.todo.id);
  }

  render() {
    const { name, completed } = this.props.todo;
    
    return (
      <div 
        onClick={this.handleClick} 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <span style={{ 
          textDecoration: completed ? 'line-through' : 'none', 
          flex: 1 
        }}>
          {name}
        </span>
        {completed && <span style={{ marginLeft: '8px' }}>✔</span>}
      </div>
    );
  }
}
