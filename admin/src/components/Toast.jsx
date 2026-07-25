import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

export function Toast({ message, type, onClose }) {
  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? <FiCheck style={{ marginRight: 8 }} /> : '⚠ '}
      {message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  return { toast, showToast };
}

export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Confirm Delete</h3>
          <button className="modal-close" onClick={onCancel}><FiX /></button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{message}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
