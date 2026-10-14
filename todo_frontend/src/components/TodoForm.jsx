
import { useEffect, useState } from "react";

function TodoForm({ onSubmit, editingTodo, onCancel }) {
    const [title, setTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setTitle(editingTodo?.title ?? "");
    }, [editingTodo]);

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) return;

        setSubmitting(true);

        try {
            await onSubmit({
                title: trimmedTitle,
                completed: editingTodo?.completed ?? false,
            });

            setTitle("");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What needs to be done?"
                maxLength={200}
                aria-label="Todo title"
                required
            />

            <button type="submit" disabled={submitting}>
                {submitting
                    ? "Saving..."
                    : editingTodo
                        ? "Save changes"
                        : "Add Todo"}
            </button>

            {editingTodo && (
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                    disabled={submitting}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default TodoForm;
