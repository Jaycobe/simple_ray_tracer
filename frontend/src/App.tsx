import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Hello!");

    type RenderMode = "raytrace" | "lightweight";
    const [mode, setMode] = useState<RenderMode>("raytrace");  // annotate
    const [busy, setBusy] = useState(false);

    return (
        <div id="App">
            <div id="text" className="result">{mode}</div>
            <label>
                <input
                    type="radio"
                    name="mode"
                    checked={mode === 'lightweight'}
                    onChange={() => setMode("lightweight")}
                />
                Lightweight
            </label>

            <label>
                <input
                    type="radio"
                    name="mode"
                    checked={mode === 'raytrace'}
                    onChange={() => setMode("raytrace")}
                />
                RayTrace
            </label>
        </div>
    )
}

export default App
