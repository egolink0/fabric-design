import "./font.css";
import Fabritor from "@/fabritor";
import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";
import "./global.css";

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript

root.render(<App />);
