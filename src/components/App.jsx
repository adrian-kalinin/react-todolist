import { useState } from 'react';

function App() {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setDescription(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();

    if (description) {
      setTodos([...todos, description]);
      setDescription('');
    }
  };

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input type="text" className="form-control" onChange={inputChanged} value={description} placeholder="Description" />
        <button type="button" className="btn btn-outline-secondary" onClick={addTodo}>Add task</button>
      </div>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { todos.map((todo) => (
            // eslint-disable-next-line react/jsx-key
            <tr>
              <td>{todo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
