import { cx } from '../../utils/cx.js';
import styles from './RequestForm.module.css';

const MAX_LEN = 300;

export default function NotesTextarea({ value, onChange, onBlur }) {
  function handleChange(e) {
    if (e.target.value.length > MAX_LEN) return; // stop typing past the limit
    onChange(e);
  }

  let counterState = 'ok';
  if (value.length >= MAX_LEN) counterState = 'max';
  else if (value.length > 250) counterState = 'warn';

  return (
    <div>
      <textarea
        id="notes"
        name="notes"
        rows={3}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        maxLength={MAX_LEN}
        placeholder="Any extra context for the assigned engineer…"
        className={styles.textarea}
      />
      <p
        className={cx(
          styles.counter,
          counterState === 'warn' && styles['counter--warn'],
          counterState === 'max' && styles['counter--max']
        )}
      >
        {value.length} / {MAX_LEN}
      </p>
    </div>
  );
}
