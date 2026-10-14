
function ErrorMessage({ message, onDismiss }) {
    if (!message) return null;

    return (
        <div className="error-message" role="alert">
            <span>{message}</span>
            <button
                className="error-dismiss"
                onClick={onDismiss}
                aria-label="Dismiss error"
            >
                ×
            </button>
        </div>
    );
}

export default ErrorMessage;
