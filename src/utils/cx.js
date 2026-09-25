// Joins several class names into one string, skipping any falsy values.
// Example: cx(styles.card, isOpen && styles.cardOpen) -> "card cardOpen" or "card"
export function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}
