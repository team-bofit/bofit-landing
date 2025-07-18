import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import LoadingPage from "./components/LoadingPage";
import ResultPage from "./components/ResultPage";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="appContents">
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route path="/quiz" element={<QuizPage />} />
                        <Route path="/loading" element={<LoadingPage />} />
                        <Route path="/result" element={<ResultPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
