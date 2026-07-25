import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { Toast, useToast, ConfirmModal } from './Toast';

export default function CRUDPage({ title, subtitle, api, columns, FormComponent, emptyMessage = 'No items yet' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { toast, showToast } = useToast();

  const load = () => {
    setLoading(true);
    api.getAll().then(res => {
      setItems(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async data => {
    try {
      if (editing) {
        await api.update(editing._id, data);
        showToast('Updated successfully!');
      } else {
        await api.create(data);
        showToast('Created successfully!');
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch {
      showToast('Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(deleteTarget._id);
      showToast('Deleted successfully!');
      setDeleteTarget(null);
      load();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{subtitle}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { setEditing(null); setModalOpen(true); }}
        >
          <FiPlus /> Add New
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>📭</p>
            <p>{emptyMessage}</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => { setEditing(null); setModalOpen(true); }}>
              <FiPlus /> Add First Item
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    {columns.map(col => (
                      <td key={col.key}>
                        {col.render ? col.render(item[col.key], item) : (item[col.key] || '—')}
                      </td>
                    ))}
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => { setEditing(item); setModalOpen(true); }}
                        >
                          <FiEdit2 size={13} /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(item)}
                        >
                          <FiTrash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <FormComponent
                initialData={editing || {}}
                onSave={handleSave}
                onCancel={() => setModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {deleteTarget && (
        <ConfirmModal
          message={`Are you sure you want to delete this item? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && <Toast {...toast} />}
    </div>
  );
}
