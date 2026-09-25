import { useState } from 'react';
import SiteAnalytics from './SiteAnalytics.jsx';
import styles from './Analytics.module.css';

export default function AnalyticsPanel({ requests }) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? 'Hide analytics' : 'Show analytics'}
      </button>

      {open && <SiteAnalytics requests={requests} />}
    </section>
  );
}
