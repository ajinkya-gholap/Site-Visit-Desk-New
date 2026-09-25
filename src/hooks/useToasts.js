import { useState } from 'react';

let nextToastId = 1;

// Keeps track of the little pop-up notifications ("toasts") shown at the
// bottom-right of the screen. Each toast disappears on its own after 4 seconds.
export function useToasts() {
  const [toasts, setToasts] = useState([]);

  function dismiss(id) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function addToast(message, variant = 'success') {
    const id = nextToastId++;
    setToasts((prev) => [...prev, { id, message, variant }]);

    // Auto-remove this toast after 4 seconds.
    setTimeout(() => dismiss(id), 4000);

    return id;
  }

  return { toasts, addToast, dismiss };
}
