import styles from './Analytics.module.css';

// Counts how many requests fall under each value of the given key.
// Example: countBy(requests, 'category') -> { Networking: 3, CCTV: 2, ... }
function countBy(requests, key) {
  const counts = {};
  for (const request of requests) {
    const value = request[key];
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

export default function SiteAnalytics({ requests }) {
  const byCategory = countBy(requests, 'category');
  const bySeverity = countBy(requests, 'severity');
  const categoryCounts = Object.values(byCategory);
  const maxCategoryCount = categoryCounts.length > 0 ? Math.max(...categoryCounts) : 1;

  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>Requests by category</h3>
      <div className={styles.barChart}>
        {Object.entries(byCategory).map(([category, count]) => (
          <div className={styles.barRow} key={category}>
            <span className={styles.barLabel}>{category}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${(count / maxCategoryCount) * 100}%` }}
              />
            </div>
            <span className={styles.barValue}>{count}</span>
          </div>
        ))}
      </div>

      <h3 className={styles.panelTitle}>Severity split</h3>
      <div className={styles.severitySplit}>
        {Object.entries(bySeverity).map(([severity, count]) => (
          <div key={severity} className={styles.severityChip}>
            <span className={styles.severityDot} data-severity={severity} />
            {severity}: {count}
          </div>
        ))}
      </div>
    </div>
  );
}
