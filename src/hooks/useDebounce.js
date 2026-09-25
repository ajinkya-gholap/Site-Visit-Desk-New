import { useEffect, useState } from 'react';

// Returns a copy of `value` that only updates once `value` has stopped
// changing for `delay` milliseconds. Handy for search boxes, so we don't do
// work on every single keystroke.
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
