import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  // Only use the Vite environment variable — no fallback
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
    <div style={{ padding: 40 }}>
      <h1>dokploy test app</h1>

      <p><strong>API URL:</strong> {API_URL || "(not set)"}</p>

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
