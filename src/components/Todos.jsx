import { useRef, useState } from 'react';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';
import dayjs from 'dayjs';

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
  const [newTodo, setNewTodo] = useState({ description: '', date: null, priority: '' });
  const gridRef = useRef();

  const columns = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: 'priority', sortable: true, filter: true, cellStyle: getPriorityStyles },
  ];

  const addTodo = (event) => {
    event.preventDefault();

    if (newTodo.description && newTodo.date && newTodo.priority) {
      setTodos([...todos, newTodo]);
      setNewTodo({ description: '', date: null, priority: '' });
    }
  };

  const deleteTodo = () => {
    const selectedNodes = gridRef.current?.getSelectedNodes();

    if (selectedNodes?.length) {
      const selectedIndexes = selectedNodes.map((node) => node.childIndex);
      setTodos(todos.filter((_, index) => !selectedIndexes.includes(index)));
    } else {
      // eslint-disable-next-line no-alert
      alert('Select rows to delete');
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={2}
      >
        <TextField
          label="Description"
          variant="outlined"
          value={newTodo.description}
          onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
        />
        <DatePicker
          label="Date"
          value={newTodo.date}
          onChange={(newValue) => setNewTodo({ ...newTodo, date: newValue })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Priority"
          variant="outlined"
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
      <Box mt={2} className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowSelection="single"
          onGridReady={(params) => { gridRef.current = params?.api; }}
          columnDefs={columns}
          rowData={todos}
          animateRows
          defaultColDef={{ flex: 1 }}
          domLayout="autoHeight"
        />
      </Box>
    </Container>
  );
}

export default Todos;
