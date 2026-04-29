import { useState } from "react";

const darkTheme = {
  bg: "#0a0a0a", surface: "#141414", surface2: "#1c1c1c",
  border2: "rgba(255,255,255,0.15)", text: "#f0f0f0", text2: "#888",
  btnBg: "#f0f0f0", btnText: "#0a0a0a", resultBg: "#141414",
};
const lightTheme = {
  bg: "#f5f5f3", surface: "#ffffff", surface2: "#f0f0ee",
  border2: "rgba(0,0,0,0.15)", text: "#0a0a0a", text2: "#666",
  btnBg: "#0a0a0a", btnText: "#f0f0f0", resultBg: "#0a0a0a",
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const t = isDark ? darkTheme : lightTheme;

  const [form, setForm] = useState({
    name: 1, year: 2019, km_driven: 45000,
    fuel: 1, seller_type: 1, transmission: 1,
    owner: 1, mileage: 17.0, engine: 1197.0,
    max_power: 82.0, seats: 5.0
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handlePredict = async () => {
    setLoading(true); setPrice(null); setError(null);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setPrice(data.predicted_price);
    } catch {
      setError("Flask server not running — start app.py first");
    }
    setLoading(false);
  };

  const fs = {
    background: t.surface, border: `0.5px solid ${t.border2}`,
    color: t.text, padding: "10px 12px", fontSize: "14px",
    borderRadius: "6px", fontFamily: "Georgia, serif", width: "100%",
  };
  const ls = {
    fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
    color: t.text2, fontFamily: "Courier New, monospace",
    marginBottom: "6px", display: "block",
  };

  return (
    <div style={{ background: t.bg, minHeight: "100vh", transition: "all 0.3s", fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: t.text2, fontFamily: "Courier New, monospace", textTransform: "uppercase" }}>Car Price AI</div>
          <button onClick={() => setIsDark(!isDark)} style={{ background: t.surface, border: `0.5px solid ${t.border2}`, color: t.text, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontFamily: "Courier New, monospace" }}>
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "2.4rem", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
          Estimate your<br /><em style={{ color: t.text2 }}>car's value</em>
        </h1>
        <p style={{ fontSize: "13px", color: t.text2, fontFamily: "Courier New, monospace", letterSpacing: "0.05em", marginBottom: "2.5rem" }}>// ML-powered prediction engine</p>
        <div style={{ height: "0.5px", background: t.border2, marginBottom: "2rem" }} />
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.text2, fontFamily: "Courier New, monospace", marginBottom: "1rem" }}>Vehicle details</p>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1.5rem" }}>

          {/* Brand */}
          <div><label style={ls}>Brand</label>
            <select name="name" value={form.name} onChange={handleChange} style={fs}>
              {[["Maruti",1],["Skoda",2],["Honda",3],["Hyundai",4],["Toyota",5],["Ford",6],["Renault",7],["Mahindra",8],["Tata",9],["Chevrolet",10],["Datsun",11],["Jeep",12],["Mercedes-Benz",13],["Mitsubishi",14],["Audi",15],["Volkswagen",16],["BMW",17],["Nissan",18],["Lexus",19],["Jaguar",20],["Land Rover",21],["MG",22],["Volvo",23],["Daewoo",24],["Kia",25],["Fiat",26],["Force",27],["Ambassador",28],["Ashok",29],["Isuzu",30],["Opel",31]]
              .map(([label, val]) => <option key={val} value={val}>{label}</option>)}
            </select>
          </div>

          {/* Year */}
          <div><label style={ls}>Year</label>
            <input type="number" name="year" value={form.year} onChange={handleChange} min="1994" max="2020" style={fs} />
          </div>

          {/* Fuel - only what's in dataset */}
          <div><label style={ls}>Fuel Type</label>
            <select name="fuel" value={form.fuel} onChange={handleChange} style={fs}>
              <option value={1}>Diesel</option>
              <option value={2}>Petrol</option>
              <option value={3}>LPG</option>
              <option value={4}>CNG</option>
            </select>
          </div>

          {/* Transmission */}
          <div><label style={ls}>Transmission</label>
            <select name="transmission" value={form.transmission} onChange={handleChange} style={fs}>
              <option value={1}>Manual</option>
              <option value={2}>Automatic</option>
            </select>
          </div>

          {/* Seller Type */}
          <div><label style={ls}>Seller Type</label>
            <select name="seller_type" value={form.seller_type} onChange={handleChange} style={fs}>
              <option value={1}>Individual</option>
              <option value={2}>Dealer</option>
              <option value={3}>Trustmark Dealer</option>
            </select>
          </div>

          {/* Owner */}
          <div><label style={ls}>Owner</label>
            <select name="owner" value={form.owner} onChange={handleChange} style={fs}>
              <option value={1}>1st Owner</option>
              <option value={2}>2nd Owner</option>
              <option value={3}>3rd Owner</option>
              <option value={4}>4th+ Owner</option>
              <option value={5}>Test Drive Car</option>
            </select>
          </div>

          {/* KM Driven */}
          <div><label style={ls}>KM Driven</label>
            <input type="number" name="km_driven" value={form.km_driven} onChange={handleChange} style={fs} />
          </div>

          {/* Mileage */}
          <div><label style={ls}>Mileage (kmpl)</label>
            <input type="number" name="mileage" value={form.mileage} onChange={handleChange} step="0.1" style={fs} />
          </div>

          {/* Engine */}
          <div><label style={ls}>Engine (CC)</label>
            <input type="number" name="engine" value={form.engine} onChange={handleChange} style={fs} />
          </div>

          {/* Max Power */}
          <div><label style={ls}>Max Power (bhp)</label>
            <input type="number" name="max_power" value={form.max_power} onChange={handleChange} step="0.1" style={fs} />
          </div>

          {/* Seats - full width */}
          <div style={{ gridColumn: "1 / -1" }}><label style={ls}>Seats</label>
            <select name="seats" value={form.seats} onChange={handleChange} style={fs}>
              {[2,4,5,6,7,8,9,10,14].map(s => <option key={s} value={s}>{s} seats</option>)}
            </select>
          </div>
        </div>

        {/* Button */}
        <button onClick={handlePredict} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? t.text2 : t.btnBg, color: t.btnText, border: "none", borderRadius: "6px", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Courier New, monospace", cursor: loading ? "not-allowed" : "pointer", marginTop: "1rem" }}>
          {loading ? "Predicting..." : "Predict price"}
        </button>

        {/* Result */}
        {price && (
          <div style={{ marginTop: "2rem", background: t.resultBg, borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Courier New, monospace", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Estimated market value</div>
            <div style={{ fontSize: "3rem", fontWeight: 400, color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.5rem" }}>
              ${parseInt(price / 83.5).toLocaleString("en-US")}
            </div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Courier New, monospace" }}>
              ≈ ₹{Math.round(price).toLocaleString("en-IN")} INR
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: "2rem", background: t.resultBg, borderRadius: "10px", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ color: "#e24b4a", fontFamily: "Courier New, monospace", fontSize: "13px" }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}