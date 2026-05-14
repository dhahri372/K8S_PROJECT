import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [status, setStatus] = useState("Checking...");
  const [users, setUsers] = useState([]);
  const API_BASE = "http://app.pfe:32403";

  useEffect(() => {
    axios.get(`${API_BASE}/health`).then(res => setStatus(res.data.status)).catch(() => setStatus("OFFLINE"));
    axios.get(`${API_BASE}/api/users`).then(res => setUsers(res.data)).catch(() => console.log("DB Error"));
  }, []);

  return (
    <div style={s.body}>
      {/* Sidebar - Look Pro */}
      <div style={s.sidebar}>
        <div style={s.logo}>💠 CloudShield</div>
        <div style={s.menuItem}>📊 Dashboard</div>
        <div style={s.menuItemActive}>👥 User Management</div>
        <div style={s.menuItem}>⚙️ K8s Settings</div>
      </div>

      <div style={s.main}>
        {/* Header */}
        <header style={s.header}>
          <div>
            <h1 style={s.title}>Access Control Portal</h1>
            <p style={s.subtitle}>Gestion sécurisée des identités sur cluster Kubernetes</p>
          </div>
          <div style={{...s.badge, backgroundColor: status === 'UP' ? '#dcfce7' : '#fee2e2'}}>
             <span style={{...s.dot, backgroundColor: status === 'UP' ? '#22c55e' : '#ef4444'}}></span>
             System {status}
          </div>
        </header>

        {/* Stats Section */}
        <div style={s.statsGrid}>
          <div style={s.statCard}><h3>{users.length}</h3><p>Total Users</p></div>
          <div style={s.statCard}><h3>Active</h3><p>Database Status</p></div>
          <div style={s.statCard}><h3>K8s</h3><p>Orchestration</p></div>
        </div>

        {/* Users Table */}
        <div style={s.tableContainer}>
          <table style={s.table}>
            <thead>
              <tr style={s.trHead}>
                <th style={s.th}>Identity</th>
                <th style={s.th}>Email Address</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Platform Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={s.tr}>
                  <td style={s.td}>
                    <div style={s.userCell}>
                      <div style={s.avatar}>{u.name.charAt(0)}</div>
                      <span style={{fontWeight:'600'}}>{u.name}</span>
                    </div>
                  </td>
                  <td style={s.td}>{u.email}</td>
                  <td style={s.td}><span style={s.activeTag}>Verified</span></td>
                  <td style={s.td}><span style={s.roleText}>Cloud Operator</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const s = {
  body: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, system-ui' },
  sidebar: { width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '30px 20px' },
  logo: { fontSize: '22px', fontWeight: '800', marginBottom: '50px', color: '#38bdf8' },
  menuItem: { padding: '12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', color: '#94a3b8' },
  menuItemActive: { padding: '12px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#38bdf8', fontWeight: '600' },
  main: { flex: 1, padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subtitle: { color: '#64748b', marginTop: '5px' },
  badge: { display: 'flex', alignItems: 'center', padding: '6px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '14px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', marginRight: '10px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' },
  statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
  tableContainer: { backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  trHead: { backgroundColor: '#f1f5f9' },
  th: { padding: '16px', color: '#475569', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '16px', borderBottom: '1px solid #f1f5f9', color: '#334155' },
  userCell: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '35px', height: '35px', borderRadius: '10px', backgroundColor: '#38bdf8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  activeTag: { padding: '4px 10px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '6px', fontSize: '12px', fontWeight: '700' },
  roleText: { fontSize: '13px', color: '#64748b' }
};

export default App;
