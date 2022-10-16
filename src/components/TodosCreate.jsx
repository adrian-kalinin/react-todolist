import { useState } from 'react';

function TodosCreate(props) {
  const { todos, setTodos } = props;
  const [newTodo, setNewTodo] = useState({ description: '', date: '', priority: '' });

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: '', priority: '' });
    }
  };

  return (
    <form className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
        value={newTodo.description}
        placeholder="Description"
      />
      <input
        type="text"
        className="form-control"
        onChange={(event) => setNewTodo({ ...newTodo, date: event.target.value })}
        value={newTodo.date}
        placeholder="Date"
      />
      <input
        type="text"
        className="form-control"
        onChange={(event) => setNewTodo({ ...newTodo, priority: event.target.value })}
        value={newTodo.priority}
        placeholder="Priority"
      />
      <button type="submit" className="btn btn-outline-secondary" onClick={addTodo}>
        Add
      </button>
    </form>
  );
}

export default TodosCreate;
