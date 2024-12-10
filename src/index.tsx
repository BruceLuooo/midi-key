import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SelectedNoteProvider } from "./Context/SelectedNoteContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <SelectedNoteProvider>
            <App />
        </SelectedNoteProvider>
    </React.StrictMode>
);
