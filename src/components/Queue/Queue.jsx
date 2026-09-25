import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';
import QueueToolbar from './QueueToolbar.jsx';
import RequestList from './RequestList.jsx';
import { QueueSkeleton, QueueError, QueueEmpty, QueueNoMatch } from './QueueStates.jsx';
import styles from './Queue.module.css';

const SEVERITY_RANK = { Low: 0, Medium: 1, High: 2, Critical: 3 };

export default function Queue({
  requests,
  loading,
  error,
  onRetry,
  onOpenDetails,
  onAdvanceStatus,
  onDelete,
  addToast,
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [severity, setSeverity] = useState('');
  const [sort, setSort] = useState('date-asc');

  // Wait 300ms after the user stops typing before actually filtering, so we
  // don't re-filter the whole list on every single keystroke. Clearing the
  // box skips the wait so the full list comes back straight away.
  const debouncedSearch = useDebounce(search, 300);
  const activeSearch = search.trim() ? debouncedSearch.trim() : '';

  // Work out which requests should be shown, based on the current search
  // text, filters and sort order. This runs again every time the component
  // re-renders, which is simple and plenty fast for a list this size.
  let visibleRequests = requests;

  if (activeSearch) {
    const query = activeSearch.toLowerCase();
    visibleRequests = visibleRequests.filter(
      (r) => r.siteName.toLowerCase().includes(query) || r.requesterName.toLowerCase().includes(query)
    );
  }
  if (status) {
    visibleRequests = visibleRequests.filter((r) => r.status === status);
  }
  if (severity) {
    visibleRequests = visibleRequests.filter((r) => r.severity === severity);
  }

  visibleRequests = [...visibleRequests].sort((a, b) => {
    if (sort === 'date-asc') return a.visitDate.localeCompare(b.visitDate);
    if (sort === 'date-desc') return b.visitDate.localeCompare(a.visitDate);
    if (sort === 'severity-desc') return SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
    if (sort === 'severity-asc') return SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    return 0;
  });

  function clearFilters() {
    setSearch('');
    setStatus('');
    setSeverity('');
  }

  function handleCopyId(id) {
    navigator.clipboard?.writeText(id).catch(() => {});
    addToast(`Copied ${id} to clipboard`, 'info');
  }

  const hasFiltersApplied = Boolean(activeSearch || status || severity);

  function renderBody() {
    if (loading) return <QueueSkeleton />;
    if (error) return <QueueError onRetry={onRetry} />;
    if (requests.length === 0) return <QueueEmpty />;
    if (visibleRequests.length === 0) return <QueueNoMatch onClear={clearFilters} />;
    return (
      <RequestList
        requests={visibleRequests}
        onOpenDetails={onOpenDetails}
        onAdvanceStatus={onAdvanceStatus}
        onDelete={onDelete}
        onCopyId={handleCopyId}
      />
    );
  }

  return (
    <section className={styles.queue} aria-label="Request queue">
      <QueueToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        severity={severity}
        onSeverityChange={setSeverity}
        sort={sort}
        onSortChange={setSort}
      />
      {!loading && !error && (
        <p className={styles.resultCount}>
          {visibleRequests.length} of {requests.length} request{requests.length === 1 ? '' : 's'}
          {hasFiltersApplied ? ' matching filters' : ''}
        </p>
      )}
      {renderBody()}
    </section>
  );
}
