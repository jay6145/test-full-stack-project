import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setData({ error: "VITE_API_URL is not defined" });
      return;
    }

    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) =>
        setData({ error: "Failed to fetch API: " + err.message })
      );
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dokploy Test App</h1>
        <p style={styles.subtitle}>Frontend ↔ API Connectivity Check</p>

        <div style={styles.section}>
          <span style={styles.label}>API URL:</span>
          <span style={styles.value}>{API_URL || "(not set)"}</span>
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

/* Auto light/dark mode with CSS variables */
const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background: "var(--bg)",
    transition: "background 0.3s ease",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "var(--card-bg)",
    padding: "32px",
    borderRadius: "14px",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--border)",
    transition: "0.3s ease",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  subtitle: {
    margin: "0 0 24px",
    fontSize: "15px",
    color: "var(--text-secondary)",
  },
  section: {
    marginBottom: "18px",
    display: "flex",
    gap: "6px",
    fontSize: "14px",
  },
  label: {
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  value: {
    color: "var(--text-secondary)",
  },
  responseBox: {
    background: "var(--box-bg)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "16px",
    minHeight: "100px",
  },
  pre: {
    margin: 0,
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    color: "var(--text-primary)",
  },
  loading: {
    margin: 0,
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
};

// Inject CSS variables to support dark/light mode
const root = document.documentElement;

// Light mode palette
const light = {
  "--bg": "#f5f7fa",
  "--card-bg": "#ffffff",
  "--box-bg": "#f9fafb",
  "--border": "#e1e4e8",
  "--text-primary": "#111",
  "--text-secondary": "#555",
  "--shadow": "0 6px 22px rgba(0,0,0,0.07)",
};

// Dark mode palette
const dark = {
  "--bg": "#0d1117",
  "--card-bg": "#161b22",
  "--box-bg": "#1c2128",
  "--border": "#30363d",
  "--text-primary": "#e6edf3",
  "--text-secondary": "#9ba6b0",
  "--shadow": "0 6px 22px rgba(0,0,0,0.4)",
};

// Auto theme selection
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = prefersDark ? dark : light;

// Apply theme vars
Object.entries(theme).forEach(([key, val]) =>
  root.style.setProperty(key, val)
);

export default App;
