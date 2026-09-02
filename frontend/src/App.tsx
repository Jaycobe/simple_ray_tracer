import {useState} from 'react';
import './App.css';
import {RenderScene} from "../wailsjs/go/main/App";

function App() {

    type RenderMode = "raytrace" | "lightweight";
    const [mode, setMode] = useState<RenderMode>("raytrace");
    const [busy, setBusy] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [error, setErrorMessage] = useState<string | null>(null)
    const [elapsedTime, setElapsedTime] = useState<number | null>(null)


    return (
        <div id="App">
            <div id="text" className="result">{mode}</div>
            <div id="radiobox">
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

            <div id="input" className="input-box">
                <button className="btn" disabled={busy}
                        onClick={async () => {
                            setBusy(true);
                            setErrorMessage(null)
                            try {
                                const start = performance.now()
                                const b64 = await RenderScene(mode, 800, 600);
                                const end = performance.now()
                                setElapsedTime(end - start)
                                setImageSrc(`data:image/png;base64,${b64}`)
                            } catch (error) {
                                setErrorMessage(String(error))
                                setImageSrc(null)
                            } finally {
                                setBusy(false);
                            }
                        }}
                >
                    Render
                </button>
            </div>

            <div id="imgBox">
                {imageSrc && <img alt="Rendered Image" src={imageSrc}/>}
            </div>

            <div id="errBox">
                {error && <div>{error}</div>}
            </div>

            <div id="perfomanceBox">
                {elapsedTime && <div>{elapsedTime}</div>}
            </div>
        </div>
    )
}

export default App
