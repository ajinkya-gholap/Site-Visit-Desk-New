import { useEffect, useRef } from 'react';
import styles from './RequestDetailsModal.module.css';

export default function RequestDetailsModal({ request, onClose }) {
  const dialogRef = useRef(null);
  const headingId = 'request-details-heading';

  // Pressing Escape closes the modal. We add the listener when the modal
  // appears and remove it again when it disappears.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Stop the page behind the modal from scrolling, and move keyboard focus
  // into the dialog as soon as it opens.
  useEffect(() => {
    document.body.classList.add('modal-open');
    dialogRef.current?.focus();
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  if (!request) return null;

  // Clicking the dark backdrop closes the modal. Clicking inside the white
  // dialog box should NOT close it, so we stop that click from "bubbling up"
  // to the backdrop's onClick.
  function stopClickFromClosing(e) {
    e.stopPropagation();
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        ref={dialogRef}
        tabIndex={-1}
        onClick={stopClickFromClosing}
      >
        <div className={styles.dialogHeader}>
          <h2 id={headingId} className={styles.dialogTitle}>
            {request.siteName}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>

        <dl className={styles.detailGrid}>
          <Detail label="Request ID" value={request.id} />
          <Detail label="Site code" value={request.siteCode} />
          <Detail label="Category" value={request.category} />
          <Detail label="Severity" value={request.severity} />
          <Detail label="Status" value={request.status} />
          <Detail label="Visit date" value={request.visitDate} />
          <Detail label="Requester" value={request.requesterName} />
          <Detail label="Contact email" value={request.contactEmail} />
          <Detail label="Preferred contact" value={request.preferredContact} />
          <Detail label="Access approved" value={request.accessApproved ? 'Yes' : 'No'} />
          <Detail label="Affected services" value={request.services.join(', ')} full />
          {request.notifyTeams && request.notifyTeams.length > 0 && (
            <Detail label="Notify teams" value={request.notifyTeams.join(', ')} full />
          )}
          {request.escalationContact && (
            <Detail label="Escalation contact" value={request.escalationContact} full />
          )}
          {request.notes && <Detail label="Notes" value={request.notes} full />}
        </dl>
      </div>
    </div>
  );
}

function Detail({ label, value, full }) {
  return (
    <div className={full ? styles.detailFull : styles.detailItem}>
      <dt className={styles.detailLabel}>{label}</dt>
      <dd className={styles.detailValue}>{value}</dd>
    </div>
  );
}
