import { createRoot } from "react-dom/client";
import Router from "./routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(<Router />);
