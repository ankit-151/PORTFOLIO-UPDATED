import { useEffect, useState } from 'react';
import { FiTrash2, FiCheck, FiMail } from 'react-icons/fi';
import { contactApi } from '../api';
import { Toast, useToast, ConfirmModal } from '../components/Toast';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toast, showToast } = useToast();

  const load = () => {
    contactApi.getAll().then(res => {
      setMessages(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await contactApi.update(id, { read: true });
    load();
  };

  const handleDelete = async () => {
    try {
      await contactApi.delete(deleteTarget._id);
      showToast('Message deleted');
      setDeleteTarget(null);
      load();
    } catch { showToast('Failed to delete', 'error'); }
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Messages</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
        Contact form submissions {unread > 0 && <span className="badge badge-blue" style={{ marginLeft: 8 }}>{unread} unread</span>}
      </p>

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
      ) : messages.length === 0 ? (
        <div style={{ padding: 80, textAlign: 'center', color: 'var(--text-muted)' }}>
          <FiMail size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
          <p>No messages yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map(msg => (
            <div key={msg._id} className="card" style={{ padding: 20, borderLeft: msg.read ? '3px solid transparent' : '3px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>{msg.name}</p>
                  <a href={`mailto:${msg.email}`} style={{ fontSize: 13, color: 'var(--primary)' }}>{msg.email}</a>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!msg.read && (
                    <button className="btn btn-success btn-sm" onClick={() => markRead(msg._id)}>
                      <FiCheck size={12} /> Mark Read
                    </button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(msg)}>
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          message={`Delete message from ${deleteTarget.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {toast && <Toast {...toast} />}
    </div>
  );
}
