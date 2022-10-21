import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl, InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.min.css';
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

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', date: null, priority: '' });
  const gridRef = useRef();

  const columns = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY') },
    { field: 'priority', sortable: true, filter: true, cellStyle: getPriorityStyles },
  ];

  const addTask = (event) => {
    event.preventDefault();

    if (newTask.description && newTask.date && newTask.priority) {
      setTasks([...tasks, newTask]);
      setNewTask({ description: '', date: null, priority: '' });
    }
  };

  const deleteTask = () => {
    const selectedNodes = gridRef.current?.getSelectedNodes();

    if (selectedNodes?.length) {
      const selectedIndexes = selectedNodes.map((node) => node.childIndex);
      setTasks(tasks.filter((_, index) => !selectedIndexes.includes(index)));
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
          value={newTask.description}
          onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
        />
        <DatePicker
          label="Date"
          value={newTask.date}
          onChange={(newValue) => setNewTask({ ...newTask, date: newValue })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            value={newTask.priority}
            onChange={(event) => setNewTask({ ...newTask, priority: event.target.value })}
            autoWidth
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={addTask} variant="contained">
          Add
        </Button>
        <Button
          onClick={deleteTask}
          variant="contained"
          endIcon={<DeleteIcon />}
          color="error"
        >
          Delete
        </Button>
      </Stack>
      <Box mt={2} className="ag-theme-material">
        <AgGridReact
          ref={gridRef}
          rowSelection="single"
          onGridReady={(params) => { gridRef.current = params?.api; }}
          columnDefs={columns}
          rowData={tasks}
          animateRows
          defaultColDef={{ flex: 1 }}
          domLayout="autoHeight"
        />
      </Box>
    </Container>
  );
}

export default TaskList;
