
import { useCallback, useEffect, useMemo, useState } from "react";
import todoService from "./services/todoService";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function getErrorMessage(error) {
  const data = error.response?.data;

  if (data?.validationErrors) {
    return Object.values(data.validationErrors).join(". ");
  }

  return (
    data?.message ||
    data?.detail ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function handleSubmit(todoData) {
    setError("");

    try {
      if (editingTodo) {
        const updated = await todoService.update(
          editingTodo.id,
          todoData
        );

        setTodos((current) =>
          current.map((todo) =>
            todo.id === updated.id ? updated : todo
          )
        );

        setEditingTodo(null);
      } else {
        const created = await todoService.create(todoData);
        setTodos((current) => [...current, created]);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  async function handleToggle(todo) {
    setError("");

    try {
      const updated = await todoService.update(todo.id, {
        title: todo.title,
        completed: !todo.completed,
      });

      setTodos((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item
        )
      );
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    setError("");

    try {
      await todoService.delete(id);

      setTodos((current) =>
        current.filter((todo) => todo.id !== id)
      );

      if (editingTodo?.id === id) {
        setEditingTodo(null);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="app-header">
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>My Todos<span>.</span></h1>
          <p className="subtitle">
            Small steps. Meaningful progress.
          </p>
        </header>

        <ErrorMessage
          message={error}
          onDismiss={() => setError("")}
        />

        <TodoForm
          onSubmit={handleSubmit}
          editingTodo={editingTodo}
          onCancel={() => setEditingTodo(null)}
        />

        <div className="list-header">
          <div>
            <h2>Your tasks</h2>
            <p>
              {remaining} {remaining === 1 ? "task" : "tasks"} remaining
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={loadTodos}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        <div className="filter-bar" aria-label="Filter todos">
          {["all", "active", "completed"].map((value) => (
            <button
              key={value}
              type="button"
              className={filter === value ? "filter-active" : ""}
              onClick={() => setFilter(value)}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading your todos...</div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onEdit={setEditingTodo}
            onDelete={handleDelete}
          />
        )}

        <footer className="app-footer">
          Powered by React & Spring Boot
        </footer>
      </section>
    </main>
  );
}

export default App;
