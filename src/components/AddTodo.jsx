function AddTodo(props) {
  const { newTodo, setNewTodo, addTodo } = props;

  return (
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
  );
}

export default AddTodo;