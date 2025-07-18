import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import startPageCards from "../assets/start-page-cards.png";

const StartPage = () => {
    const navigate = useNavigate();
    const handleTestStart = () => {
        // 테스트 페이지로 이동
        navigate("/quiz");
    };

    return (
        <div className="StartPage">
            <div className="StartPageContents">
                <div className="Space"></div>

                <div className="contentsContainer">
                    <div className="StartPageTexts">
                        <div className="title">
                            요즘 내 인생에
                            <br />
                            필요한 보험은?
                        </div>
                        <div className="description">
                            보핏과 함께 내 멘탈상태 맞춤 보험 찾기
                        </div>
                    </div>

                    <div
                        className="StartPageImage hasImage"
                        style={{
                            backgroundImage: `url(${startPageCards})`,
                        }}
                    ></div>

                    <div className="btnContainer">
                        <div className="Button btnT2" onClick={handleTestStart}>
                            <div className="btnIcon">
                                <span className="material-icons">
                                    chevron_right
                                </span>
                            </div>
                            <div className="btnText">테스트 시작하기</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Logo">
                <div className="logoImage"></div>
            </div>
        </div>
    );
};

export default StartPage;
