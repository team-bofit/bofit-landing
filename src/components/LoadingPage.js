import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoadingPage.css";

const LoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 2.2초 후 결과 페이지로 이동
        const timer = setTimeout(() => {
            // location.state에서 받은 결과를 그대로 ResultPage로 전달
            navigate("/result", { state: location.state });
        }, 2200);

        return () => clearTimeout(timer);
    }, [navigate, location.state]);

    return (
        <div className="LoadingPage">
            {/* 로고 */}
            <div className="LoadingLogo">
                <div className="logoImage"></div>
            </div>

            {/* 로딩 인디케이터와 텍스트 */}
            <div className="LoadingContent">
                <div className="LoadingSpinner">
                    <div className="spinner"></div>
                </div>
                <div className="LoadingText">맞춤형 보험을 찾는중...</div>
            </div>
        </div>
    );
};

export default LoadingPage;
