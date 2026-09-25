import { cx } from '../../utils/cx.js';
import styles from './ToastHost.module.css';

export default function ToastHost({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={cx(styles.toast, styles[`toast--${toast.variant}`])}>
          <span>{toast.message}</span>
          <button
            type="button"
            className={styles.close}
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
