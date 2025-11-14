import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/")
      .then(res => res.json())
      .then(setData)
      .catch(err => setData({ error: err.message }));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dokploy Full Stack Test App</h1>
      <h2>Frontend → Backend Test:</h2>

      {data ? (
        <pre style={{ background: "#eee", padding: 20 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
