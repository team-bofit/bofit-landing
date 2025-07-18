import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    // 4가지 보험카드 정의
    const insuranceCards = {
        뇌세포: {
            title: "🧠 뇌세포 보장보험",
            keywords: "멍때리기, 무기력, 번잡한 생각",
            description:
                "머리가 멈췄다고 세상이 멈추진 않아요.\n요즘 자꾸 뇌가 로그아웃되나요?\n괜찮아요, 가끔 생각 없이 사는 것도 능력!\n오늘은 그냥 자동모드로 살아가봐요!",
            icon: "/images/brain-insurance.png",
            bgImage:
                "https://doda-static.com/img/1200/65/1/1/1752738728893-4755242.png",
        },
        꿀잠: {
            title: "😴 꿀잠보장보험",
            keywords: "불면, 수면부족, 피곤",
            description:
                "밤새 뒤척인 당신을 위한 꿀잠처방.\n잠은 안와도 내일은 온다! 자라!\n생각은 접어두고 눈을 감아봐요.\n내일의 내가 알아서 하겠죠 뭐!",
            icon: "/images/sleep-insurance.png",
            bgImage:
                "https://doda-static.com/img/1200/65/1/1/1752738728893-4755242.png",
        },
        멘탈: {
            title: "✨ 멘탈보장보험",
            keywords: "불안, 걱정, 감정기복",
            description:
                "작은 일에도 멘탈이 흔들리는\n섬세한 당신을 위한 멘탈보장보험!\n요즘 멘탈이 롤러코스터 타나요?\n잠시 멘탈 휴업하고 충전의 시간 가지세요.\n어차피 내 멘탈이야, 내가 흔들어도 괜찮아요!",
            icon: "/images/mental-insurance.png",
            bgImage:
                "https://doda-static.com/img/1200/65/1/1/1752738728893-4755242.png",
        },
        번아웃: {
            title: "🔥 번아웃방지보험",
            keywords: "업무지침, 탈진, 스트레스",
            description:
                "더 탈 곳도 없고, 태울 에너지도 없는\n당신을 위한 번아웃방지보험!\n지친 당신, 이미 충분히 타올랐어요.\n가끔은 그냥 뒹굴뒹굴 누워만 있어도 됩니다.\n당신의 번아웃을 우리가 막아줄게요!",
            icon: "/images/burnout-insurance.png",
            bgImage:
                "https://doda-static.com/img/1200/65/1/1/1752738728893-4755242.png",
        },
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleRestart = () => {
        navigate("/");
    };

    // location.state에서 결과 가져오기
    const result = location.state?.result || {};
    const resultType = result.type || "멘탈";
    const currentCard = insuranceCards[resultType];

    if (!currentCard) {
        return <div>결과를 찾을 수 없습니다.</div>;
    }

    return (
        <div
            className="appContents"
            style={{
                backgroundColor: "rgb(248, 253, 251)",
                color: "rgb(0, 0, 0)",
            }}
        >
            <div className={`ResultPage ${isVisible ? "visible" : ""}`}>
                {/* Result Image */}
                <div className="ResultImage">
                    <div className="imgHover"></div>
                    <div
                        className="image"
                        style={{
                            backgroundImage: `url("${currentCard.icon}")`,
                        }}
                    ></div>
                </div>

                {/* Result Card */}
                <div className="ResultCard">
                    <div className="ResultCardTitle">
                        <div className="smallTitle">
                            당신에게 추천하는 보험은...
                        </div>
                        <div className="mainTitle">{currentCard.title}</div>
                    </div>

                    <div className="Line">
                        <div className="box"></div>
                    </div>

                    <div className="ResultCardText">
                        {currentCard.description
                            .split("\n")
                            .map((line, index) => (
                                <p key={index} style={{ textAlign: "center" }}>
                                    {line}
                                </p>
                            ))}
                    </div>

                    <div className="Space"></div>
                </div>

                <div className="btnContainer">
                    <div className="Button btnT2" onClick={handleRestart}>
                        <div className="btnIcon">
                            <span className="material-icons">replay</span>
                        </div>
                        <div className="btnText">다시 시작하기</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
