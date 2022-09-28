import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState({ description: '', date: '' });
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: '' });
    }
  };

  const deleteTodo = (event, todoIndex) => {
    setTodos(todos.filter((_, index) => index !== todoIndex));
  };

  return (
    <div className="container mt-3">
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
        <button type="submit" className="btn btn-outline-secondary" onClick={addTodo}>
          Add
        </button>
      </form>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          { todos.map((todo, index) => (
            // eslint-disable-next-line react/jsx-key,react/no-array-index-key
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={(event) => deleteTodo(event, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
