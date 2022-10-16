import { useRef, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';

function getPriorityStyles(params) {
  switch (params.value.toLowerCase()) {
    case 'high':
      return { color: 'red' };
    case 'medium':
      return { color: 'orange' };
    case 'low':
      return { color: 'blue' };
    default:
      return { color: 'black' };
  }
}

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ description: '', date: '', priority: '' });
  const gridRef = useRef();

  const columns = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true, cellStyle: getPriorityStyles },
  ];

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: '', priority: '' });
    }
  };

  const deleteTodo = () => {
    const selectedNodes = gridRef.current.getSelectedNodes();

    if (selectedNodes.length) {
      const selectedIndexes = selectedNodes.map((node) => node.childIndex);
      setTodos(todos.filter((_, index) => !selectedIndexes.includes(index)));
    } else {
      // eslint-disable-next-line no-alert
      alert('Select rows to delete');
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <TextField
          label="Description"
          variant="standard"
          value={newTodo.description}
          onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
        />
        <TextField
          label="Date"
          variant="standard"
          value={newTodo.date}
          onChange={(event) => setNewTodo({ ...newTodo, date: event.target.value })}
        />
        <TextField
          label="Priority"
          variant="standard"
          value={newTodo.priority}
          onChange={(event) => setNewTodo({ ...newTodo, priority: event.target.value })}
        />
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        <Button onClick={deleteTodo} variant="contained" color="error">
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowSelection="single"
          onGridReady={(params) => { gridRef.current = params.api; }}
          columnDefs={columns}
          rowData={todos}
          animateRows
          defaultColDef={{ flex: 1 }}
          domLayout="autoHeight"
        />
      </div>
    </>
  );
}

export default Todos;
