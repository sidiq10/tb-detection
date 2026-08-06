import { useState } from "react";

function Detect() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://skripsi-sidiq.venusverse.dev/api/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.result);
    setConfidence((data.confidence * 100).toFixed(2));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#3b82f6', marginBottom: '20px' }}>Sistem Deteksi TBC</h2>
      
      <div style={{ padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '12px', marginBottom: '20px' }}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          style={{ width: '100%', marginBottom: '10px' }}
          accept="image/*"
        />
        <button 
          onClick={handleSubmit}
          style={{ 
            width: '100%', padding: '12px', background: '#3b82f6', color: 'white', 
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
          }}
        >
          Deteksi
        </button>
      </div>

      {result && (
        <div style={{ 
          padding: '20px', borderRadius: '12px',
          background: result === 'TB' ? '#fee2e2' : '#dcfce7',
          color: result === 'TB' ? '#991b1b' : '#166534',
          border: `1px solid ${result === 'TB' ? '#f87171' : '#4ade80'}`
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Hasil: {result === 'TB' ? 'Tuberkulosis' : 'Normal'}</h3>
          <p style={{ margin: 0 }}>Confidence: {confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default Detect;