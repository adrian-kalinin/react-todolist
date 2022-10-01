import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

function TodoTable(props) {
  const { todos, setTodos } = props;
  const gridRef = useRef();

  const columns = [
    { field: 'description', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'priority', sortable: true, filter: true, cellStyle: getPriorityStyles },
  ];

  function deleteTodo() {
    const selectedNodes = gridRef.current.getSelectedNodes();

    if (selectedNodes.length) {
      const selectedIndexes = selectedNodes.map((node) => node.childIndex);
      setTodos(todos.filter((_, index) => !selectedIndexes.includes(index)));
    } else {
      // eslint-disable-next-line no-alert
      alert('Select rows to delete');
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-secondary" onClick={deleteTodo}>
          Delete selected rows
        </button>
      </div>
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

export default TodoTable;
