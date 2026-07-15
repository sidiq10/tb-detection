import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Silakan pilih gambar terlebih dahulu!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(data.result);
      setConfidence(data.confidence.toFixed(2));
    } catch (error) {
      alert("Terjadi kesalahan saat memproses data.");
    }

    setLoading(false);
  };

  const resetDetector = () => {
    setFile(null);
    setPreview(null);
    setResult("");
    setConfidence("");
  };

  return (
    <div className="app-container">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🫁</span>
            <span className="logo-text">TuberculosisDetect</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={() => setActiveSection("home")} className={activeSection === "home" ? "active" : ""}>
                Beranda
              </a>
            </li>
            <li>
              <a href="#info" onClick={() => setActiveSection("info")} className={activeSection === "info" ? "active" : ""}>
                Tentang
              </a>
            </li>
            <li>
              <a href="#detect" onClick={() => setActiveSection("detect")} className={activeSection === "detect" ? "active" : ""}>
                Deteksi
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Deteksi Tuberculosis dengan AI</h1>
          <p className="hero-subtitle">
            Teknologi machine learning canggih untuk diagnosis cepat dan akurat melalui analisis gambar X-ray paru-paru
          </p>
          <button className="cta-button" onClick={() => setActiveSection("detect")}>
            Mulai Deteksi Sekarang →
          </button>
        </div>
        <div className="hero-illustration">
          <div className="floating-card">
            <span className="large-icon">🫁</span>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section id="info" className="info-section">
        <h2 className="section-title">Tentang Aplikasi</h2>
        <p className="section-subtitle">
          Aplikasi ini dikembangkan sebagai alat bantu deteksi dini tuberkulosis berdasarkan citra Chest X-ray dengan memanfaatkan teknologi deep learning.
        </p>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Tujuan Pengembangan</h3>
            <p>
              Aplikasi ini bertujuan membantu pengguna memahami potensi gejala tuberkulosis melalui analisis awal citra X-ray paru-paru secara cepat dan mudah.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🧠</div>
            <h3>Metode yang Digunakan</h3>
            <p>
              Sistem ini menggunakan pendekatan deep learning dengan pemrosesan citra digital, termasuk pelabelan gambar, normalisasi, dan inferensi model untuk menghasilkan prediksi.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">⚙️</div>
            <h3>Model EfficientNetB0</h3>
            <p>
              Model yang digunakan adalah EfficientNetB0, arsitektur convolutional neural network yang efisien dan efektif untuk klasifikasi citra medis berbasis fitur visual yang kompleks.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🩺</div>
            <h3>Ruang Lingkup Penggunaan</h3>
            <p>
              Hasil prediksi aplikasi ini bersifat pendukung dan tidak menggantikan diagnosis medis. Konfirmasi lebih lanjut tetap diperlukan melalui pemeriksaan dokter dan tenaga kesehatan profesional.
            </p>
          </div>
        </div>
      </section>

      {/* DETECTOR SECTION */}
      <section id="detect" className="detector-section">
        <div className="detector-container">
          <h2 className="section-title">Sistem Deteksi TBC</h2>
          <p className="section-subtitle">
            Upload gambar X-ray paru-paru Anda untuk analisis
          </p>

          <div className="detector-card">
            <label className="upload-box">
              <input type="file" onChange={handleFileChange} hidden accept="image/*" />
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-img" />
                  <button type="button" className="change-image-btn" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('input[type="file"]').click();
                  }}>
                    Ubah Gambar
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📤</div>
                  <p>Klik atau drag & drop gambar X-ray</p>
                  <span className="file-format">.jpg, .png, .jpeg</span>
                </div>
              )}
            </label>

            <div className="detector-buttons">
              <button 
                onClick={handleSubmit} 
                className={`detect-button ${loading ? "loading" : ""}`}
                disabled={!file || loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Menganalisis...
                  </>
                ) : (
                  "Deteksi Sekarang"
                )}
              </button>
              {file && !result && (
                <button onClick={resetDetector} className="reset-button">
                  Reset
                </button>
              )}
            </div>

            {result && (
              <div className={`result-box ${result === "TB" ? "tb-positive" : "tb-negative"}`}>
                <div className="result-header">
                  <span className={`result-icon ${result === "TB" ? "danger" : "success"}`}>
                    {result === "TB" ? "⚠️" : "✓"}
                  </span>
                  <h3 className="result-title">
                    {result === "TB" ? "TB Terdeteksi" : "Hasil Negatif"}
                  </h3>
                </div>
                <div className="result-content">
                  <p className="result-label">Tingkat Keyakinan</p>
                  <div className="confidence-bar">
                    <div 
                      className={`confidence-fill ${result === "TB" ? "danger" : "success"}`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <p className="confidence-value">{confidence}%</p>
                  <p className="result-description">
                    {result === "TB" 
                      ? "Deteksi menunjukkan adanya indikasi tuberculosis. Silakan konsultasi dengan dokter untuk diagnosis lebih lanjut."
                      : "Hasil analisis menunjukkan paru-paru dalam kondisi normal. Tetap jaga kesehatan Anda."}
                  </p>
                </div>
                <button onClick={resetDetector} className="result-reset-button">
                  Analisis Gambar Lain
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 TuberculosisDetect. Sistem Diagnosis Berbasis AI.</p>
          <p className="disclaimer">
            ⚕️ Sistem ini adalah alat bantu diagnosis dan bukan pengganti konsultasi medis profesional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;