import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Auto theme detection
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const light = {
      "--bg-gradient": "linear-gradient(to bottom right, #eef2f7, #e5e9f0)",
      "--card-bg": "#ffffff",
      "--box-bg": "#f7f9fc",
      "--border": "#d8dce3",
      "--text-primary": "#111",
      "--text-secondary": "#555",
      "--shadow": "0 8px 28px rgba(0,0,0,0.05)",
      "--font": "'Inter', system-ui, sans-serif"
    };

    const dark = {
      "--bg-gradient": "linear-gradient(to bottom right, #1a1f25, #121417)",
      "--card-bg": "#1f252c",
      "--box-bg": "#252b33",
      "--border": "#333a42",
      "--text-primary": "#e8edf2",
      "--text-secondary": "#9ba6b0",
      "--shadow": "0 8px 28px rgba(0,0,0,0.35)",
      "--font": "'Inter', system-ui, sans-serif"
    };

    const theme = prefersDark ? dark : light;
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, val]) =>
      root.style.setProperty(key, val)
    );
  }, []);

  useEffect(() => {
    if (!API_URL) {
      setData({ error: "VITE_API_URL is not defined" });
      return;
    }

    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setData({ error: err.message }));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dokploy Test App</h1>
        <p style={styles.subtitle}>Frontend ↔ API Connectivity Check</p>

        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>API URL:</span>
          <span style={styles.infoValue}>{API_URL || "(not set)"}</span>
        </div>

        <div style={styles.responseBox}>
          {data ? (
            <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p style={styles.loading}>Loading…</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Clean + modern layout */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    background: "var(--bg-gradient)",
    fontFamily: "var(--font)",
    transition: "0.3s ease",
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    padding: "32px 36px",
    borderRadius: "16px",
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
    fontFamily: "var(--font)",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  subtitle: {
    margin: "6px 0 24px",
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  infoRow: {
    marginBottom: "20px",
    fontSize: "14px",
  },
  infoLabel: {
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  infoValue: {
    color: "var(--text-secondary)",
    marginLeft: "4px",
  },
  responseBox: {
    background: "var(--box-bg)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "18px",
    minHeight: "110px",
  },
  pre: {
    margin: 0,
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "var(--text-primary)",
  },
  loading: {
    margin: 0,
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
};

export default App;
