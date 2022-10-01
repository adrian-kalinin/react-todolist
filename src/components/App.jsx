import { useState } from 'react';
import TodoTable from './TodoTable';
import AddTodo from './AddTodo';

function App() {
  const [newTodo, setNewTodo] = useState({ description: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: '', priority: '' });
    }
  };

  const deleteTodo = (event, todoIndex) => {
    setTodos(todos.filter((_, index) => index !== todoIndex));
  };

  return (
    <main className="container mt-3">
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </main>
  );
}

export default App;
