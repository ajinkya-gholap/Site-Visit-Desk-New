import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import RequestForm from './components/RequestForm/RequestForm.jsx';
import Queue from './components/Queue/Queue.jsx';
import RequestDetailsModal from './components/Modal/RequestDetailsModal.jsx';
import ToastHost from './components/Toast/ToastHost.jsx';
import AnalyticsPanel from './components/Analytics/AnalyticsPanel.jsx';
import { fetchRequests } from './api/mockApi.js';
import { useToasts } from './hooks/useToasts.js';
import styles from './App.module.css';

export default function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { toasts, addToast, dismiss } = useToasts();

  function loadRequests() {
    setLoading(true);
    setError(null);
    fetchRequests()
      .then((data) => setRequests(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  // Load the queue once, when the app first appears on screen.
  useEffect(() => {
    loadRequests();
  }, []);

  function handleCreated(created) {
    // Put the new request at the top of the list, without changing the old array.
    setRequests((prev) => [created, ...prev]);
  }

  function handleAdvanceStatus(id, nextStatus) {
    setRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: nextStatus } : request))
    );
  }

  function handleDelete(id) {
    setRequests((prev) => prev.filter((request) => request.id !== id));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(null);
    }
  }

  const openCount = requests.filter((r) => r.status !== 'Closed').length;
  const urgentCount = requests.filter(
    (r) => r.severity === 'Critical' && r.status !== 'Closed'
  ).length;

  return (
    <div className={styles.app}>
      <Header openCount={openCount} urgentCount={urgentCount} />

      <main className={styles.layout}>
        <div className={styles.formColumn}>
          <RequestForm onCreated={handleCreated} addToast={addToast} />
        </div>

        <div className={styles.queueColumn}>
          <Queue
            requests={requests}
            loading={loading}
            error={error}
            onRetry={loadRequests}
            onOpenDetails={(request) => setSelectedRequest(request)}
            onAdvanceStatus={handleAdvanceStatus}
            onDelete={handleDelete}
            addToast={addToast}
          />
          {!loading && !error && <AnalyticsPanel requests={requests} />}
        </div>
      </main>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      <ToastHost toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
