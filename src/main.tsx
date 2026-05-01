import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const redirectPath = sessionStorage.getItem("gh-pages-redirect");
if (redirectPath) {
  sessionStorage.removeItem("gh-pages-redirect");
  window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);
