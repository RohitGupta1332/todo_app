
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onEdit, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">✓</div>
                <h3>You're all caught up!</h3>
                <p>Add a todo above to get started.</p>
            </div>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TodoList;
