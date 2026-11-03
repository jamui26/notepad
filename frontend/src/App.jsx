
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const route =
        page === "login" ? "/user/login" : "/user/register";

      const res = await axios.post(API + route, {
        name,
        email,
        password,
      });

      setMessage(res.data.msg);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (
        page === "register" &&
        res.data.msg === "User registered successfully"
      ) {
        setPage("login");
        setPassword("");
      }
    } catch (error) {
  console.log("API ERROR:", error);
  console.log("ERROR STATUS:", error.response?.status);
  console.log("ERROR DATA:", error.response?.data);

  setMessage(
    error.response?.data?.msg ||
      "Unable to connect. Please check your server."
  );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="notenest">
      <section className="left-panel">
        <nav className="brand">
          <div className="brand-icon">N</div>
          <span>NoteNest</span>
        </nav>

        <div className="intro">
          <p className="eyebrow">YOUR PERSONAL NOTES SPACE</p>

          <h1>
            Keep your notes
            <br />
            <span>organized.</span>
          </h1>

          <p className="intro-text">
            Save your ideas, manage daily tasks,
            and keep all your important notes
            together in one place.
          </p>

          <div className="note-preview">
            <div className="preview-top">
              <span className="preview-dot"></span>
              <span>MY QUICK NOTES</span>
            </div>

            <div className="preview-note">
              <span className="note-symbol">✦</span>
              <div>
                <h3>Ideas for today</h3>
                <p>Learn something new. Keep growing.</p>
              </div>
            </div>

            <div className="preview-note second-note">
              <span className="note-symbol">✓</span>
              <div>
                <h3>Daily reminder</h3>
                <p>Small steps make a big difference.</p>
              </div>
            </div>

            <div className="preview-footer">
              <span>2 SAMPLE NOTES</span>
              <span>STAY ORGANIZED ↗</span>
            </div>
          </div>
        </div>

        <footer className="left-footer">
          <span>SIMPLE NOTES. BETTER ORGANIZATION.</span>
          <span>© 2026 NOTENEST</span>
        </footer>
      </section>

      <section className="right-panel">
        <div className="top-label">
          <span>YOUR SPACE, YOUR IDEAS</span>
          <span className="top-star">✳</span>
        </div>

        <div className="auth-card">
          <div className="welcome-icon">✦</div>

          <p className="form-label">
            {page === "login" ? "WELCOME BACK" : "GET STARTED"}
          </p>

          <h2>
            {page === "login"
              ? "Good to see you."
              : "Create your account."}
          </h2>

          <p className="form-description">
            {page === "login"
              ? "Sign in to access your personal notes."
              : "Join NoteNest and organize your ideas."}
          </p>

          <div className="tabs">
            <button
              type="button"
              className={page === "login" ? "active" : ""}
              onClick={() => {
                setPage("login");
                setMessage("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={page === "register" ? "active" : ""}
              onClick={() => {
                setPage("register");
                setMessage("");
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {page === "register" && (
              <label>
                Full name
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : page === "login"
                ? "Login to NoteNest  →"
                : "Create account  →"}
            </button>
          </form>

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}

          <p className="bottom-text">
            {page === "login"
              ? "New to NoteNest? Select Register to get started."
              : "Already have an account? Select Login."}
          </p>
        </div>

        <footer className="right-footer">
          Made for your everyday ideas.
        </footer>
      </section>
    </main>
  );
}

export default App;
