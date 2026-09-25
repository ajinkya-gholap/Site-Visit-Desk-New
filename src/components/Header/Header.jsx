import styles from './Header.module.css';

export default function Header({ openCount, urgentCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img className={styles.mark} src="/download.webp" alt="Site Visit Desk logo" />
        <div>
          <h1 className={styles.title}>Site Visit Desk</h1>
          <p className={styles.subtitle}>Commtel Networks · field coordination</p>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.counts}>
          <span className={styles.count}>{openCount} open</span>
          <span className={styles.dot} aria-hidden="true">
            |
          </span>
          <span className={styles.countUrgent}>{urgentCount} urgent</span>
        </div>
      </div>
    </header>
  );
}
