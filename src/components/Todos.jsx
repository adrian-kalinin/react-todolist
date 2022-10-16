import { useState } from 'react';
import TodosCreate from './TodosCreate';
import TodosTable from './TodosTable';

function Todos() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <TodosCreate todos={todos} setTodos={setTodos} />
      <TodosTable todos={todos} setTodos={setTodos} />
    </>
  );
}

export default Todos;
