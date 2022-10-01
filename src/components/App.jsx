import { useState } from 'react';
import TodoTable from './TodoTable';
import AddTodo from './AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <main className="container mt-3">
      <AddTodo todos={todos} setTodos={setTodos} />
      <TodoTable todos={todos} setTodos={setTodos} />
    </main>
  );
}

export default App;
