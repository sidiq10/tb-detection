import { useState } from "react";

function Detect() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.result);
    setConfidence((data.confidence * 100).toFixed(2));
  };

  return (
    <div>
      <h2>Sistem Deteksi TBC</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Deteksi</button>

      {result && (
        <div>
          <h3>Hasil: {result}</h3>
          <p>Confidence: {confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default Detect;