import { useState, useEffect } from "react";
import {
  Activity, UploadCloud, BrainCircuit, ScanSearch, ShieldCheck,
  ArrowRight, RefreshCcw, AlertTriangle, CheckCircle2
} from "lucide-react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult("");
      setConfidence("");
    }
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
      alert("Terjadi kesalahan saat memproses data. Pastikan backend Python menyala.");
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
    <div className={`app-container ${mounted ? 'fade-in' : ''}`}>
      <div className="bg-pattern"></div>

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo" onClick={() => setActiveSection("home")}>
            <Activity className="logo-icon text-primary" size={32} />
            <span className="logo-text">TuberculosisAI</span>
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
      <section id="home" className="hero-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="hero-content">
          <div className="badge">Teknologi Terbaru 2026</div>
          <h1 className="hero-title">
            Deteksi Cerdas <br /> <span>Tuberkulosis</span>
          </h1>
          <p className="hero-subtitle">
            Analisis gambar X-ray paru-paru Anda dalam hitungan detik menggunakan kekuatan Machine Learning mutakhir.
          </p>
          <button className="cta-button group" onClick={() => {
            setActiveSection("detect");
            document.getElementById("detect").scrollIntoView({ behavior: "smooth" });
          }}>
            Mulai Deteksi Sekarang
            <ArrowRight className="btn-icon" size={20} />
          </button>
        </div>
        <div className="hero-illustration">
          <div className="floating-card hero-image-card">
            <div className="scan-line"></div>
            <img src="/lung_xray.png" alt="X-ray Paru-paru" className="xray-image" />
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section id="info" className="info-section">
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Bagaimana Kami Bekerja?</h2>
          <p className="section-subtitle">
            Sistem kami dirancang untuk memberikan hasil analisis pendukung dengan tingkat akurasi tinggi melalui beberapa tahap pemrosesan canggih.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="icon-wrapper bg-blue-100 text-blue-600">
              <UploadCloud size={32} />
            </div>
            <h3>1. Upload Citra</h3>
            <p>Unggah hasil X-ray paru-paru Anda dalam format gambar standar dengan aman dan cepat.</p>
          </div>
          <div className="info-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="icon-wrapper bg-indigo-100 text-indigo-600">
              <BrainCircuit size={32} />
            </div>
            <h3>2. Analisis AI</h3>
            <p>Model EfficientNetB0 kami akan mengekstrak jutaan parameter fitur dari gambar Anda.</p>
          </div>
          <div className="info-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="icon-wrapper bg-emerald-100 text-emerald-600">
              <ShieldCheck size={32} />
            </div>
            <h3>3. Hasil Instan</h3>
            <p>Dapatkan prediksi probabilitas dan rekomendasi awal dalam hitungan detik.</p>
          </div>
        </div>
      </section>

      {/* DETECTOR SECTION */}
      <section id="detect" className="detector-section">
        <div className="detector-container animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title">Mulai Analisis Anda</h2>
          <p className="section-subtitle">
            Format yang didukung: JPG, PNG, JPEG. Pastikan gambar jelas dan memiliki pencahayaan baik.
          </p>

          <div className="detector-card shadow-glass">
            <label className="upload-box">
              <input type="file" onChange={handleFileChange} hidden accept="image/*" />
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview X-ray" className="preview-img" />
                  <button type="button" className="change-image-btn" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('input[type="file"]').click();
                  }}>
                    <RefreshCcw size={16} /> Ganti Gambar
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon-wrapper">
                    <UploadCloud size={60} className="text-primary upload-icon" />
                  </div>
                  <p>Klik area ini untuk unggah X-ray</p>
                  <span className="file-format">Maks. 5MB (JPG, PNG)</span>
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
                    Menganalisis Pola...
                  </>
                ) : (
                  <>
                    <ScanSearch size={20} />
                    Deteksi Gambar
                  </>
                )}
              </button>
              {file && !result && !loading && (
                <button onClick={resetDetector} className="reset-button">
                  Batal
                </button>
              )}
            </div>

            {result && (
              <div className={`result-box ${result === "TB" ? "tb-positive" : "tb-negative"}`}>
                <div className="result-header">
                  {result === "TB" ? (
                    <AlertTriangle size={48} className="result-icon text-danger" />
                  ) : (
                    <CheckCircle2 size={48} className="result-icon text-success" />
                  )}
                  <h3 className="result-title">
                    {result === "TB" ? "Tuberkulosis" : "Normal"}
                  </h3>
                </div>
                <div className="result-content">
                  <p className="result-label">Tingkat Keyakinan AI</p>
                  <div className="confidence-value">{confidence}%</div>
                  <div className="confidence-bar">
                    <div
                      className={`confidence-fill ${result === "TB" ? "bg-danger" : "bg-success"}`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <p className="result-description">
                    {result === "TB"
                      ? "Berdasarkan pola citra, terdapat anomali yang menyerupai tuberkulosis. Kami sangat menyarankan Anda untuk segera berkonsultasi dengan dokter untuk diagnosis klinis."
                      : "Citra tidak menunjukkan anomali signifikan terkait tuberkulosis. Tetap jaga pola hidup sehat dan konsultasi ke dokter jika ada keluhan pernapasan."}
                  </p>
                </div>
                <button onClick={resetDetector} className="result-reset-button">
                  <RefreshCcw size={18} /> Analisis Citra Lainnya
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Activity size={20} />
            <span>TuberculosisAI</span>
          </div>
          <p className="footer-copyright">&copy; 2026 AI Healthcare Initiative. Membantu mendeteksi lebih awal.</p>
          <div className="disclaimer">
            <strong>Penafian Medis:</strong> Sistem ini merupakan purwarupa penelitian AI dan bukan alat diagnosis klinis yang disetujui. Segala keputusan medis harus diambil oleh dokter berlisensi.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;