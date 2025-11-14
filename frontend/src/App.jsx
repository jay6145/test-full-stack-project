import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || "http://api:3001") + "/")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setData({ error: err.message }));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dokploy Full Stack Test App 🚀</h1>

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
