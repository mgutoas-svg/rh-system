import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';

export default function Employees() {
  const { employees, isLoading, createMutation, updateMutation, deleteMutation } = useEmployees();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ nome: '', salarioBase: 0, status: 'ativo', departmentId: '', positionId: '' });

  const handleCreate = async () => {
    if (!form.nome) return alert('Name is required');
    await createMutation.mutateAsync(form);
    setCreating(false);
    setForm({ nome: '', salarioBase: 0, status: 'ativo', departmentId: '', positionId: '' });
  };

  const handleUpdate = async (id: string) => {
    await updateMutation.mutateAsync({ id, data: form });
    setEditingId(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Employees</h1>
        <button
          onClick={() => setCreating(true)}
          style={{ backgroundColor: '#16a34a', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          + New
        </button>
      </div>

      {creating && (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h2>New Employee</h2>
          <input placeholder="Name" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
          <input placeholder="Salary" type="number" value={form.salarioBase} onChange={(e) => setForm({...form, salarioBase: Number(e.target.value)})} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
          <button onClick={handleCreate} style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>Save</button>
          <button onClick={() => setCreating(false)} style={{ backgroundColor: '#6b7280', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f3f4f6' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Salary</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp: any) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '1rem' }}>{emp.nome}</td>
                <td style={{ padding: '1rem' }}>{emp.status}</td>
                <td style={{ padding: '1rem' }}>R$ {emp.salarioBase.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => { setEditingId(emp.id); setForm(emp); }} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Edit</button>
                  <button onClick={() => deleteMutation.mutate(emp.id)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', marginLeft: '1rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
