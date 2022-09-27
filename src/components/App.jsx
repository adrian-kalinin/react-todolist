import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState({ description: '', date: '' });
  const [todos, setTodos] = useState([]);

  const descriptionChanged = (event) => {
    setNewTodo({ ...newTodo, description: event.target.value });
  };

  const dateChanged = (event) => {
    setNewTodo({ ...newTodo, date: event.target.value });
  };

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: '' });
    }
  };

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input type="text" className="form-control" onChange={descriptionChanged} value={newTodo.description} placeholder="Description" />
        <input type="text" className="form-control" onChange={dateChanged} value={newTodo.date} placeholder="Date" />
        <button type="button" className="btn btn-outline-secondary" onClick={addTodo}>Add</button>
      </div>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          { todos.map((todo) => (
            // eslint-disable-next-line react/jsx-key
            <tr>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
