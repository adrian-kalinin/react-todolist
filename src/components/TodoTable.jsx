function TodoTable(props) {
  const { todos, deleteTodo } = props;

  return (
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
  );
}

export default TodoTable;
