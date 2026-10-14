
function TodoItem({ todo, onToggle, onEdit, onDelete }) {
    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <label className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                    aria-label={`Mark ${todo.title} as ${todo.completed ? "incomplete" : "complete"
                        }`}
                />

                <span className="todo-title">{todo.title}</span>
            </label>

            <div className="todo-actions">
                <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(todo)}
                    aria-label={`Edit ${todo.title}`}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(todo.id)}
                    aria-label={`Delete ${todo.title}`}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
