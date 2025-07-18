import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizPage.css";

const QuizPage = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [progress, setProgress] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [buttonsSlideOut, setButtonsSlideOut] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    // 테스트 질문 데이터
    const questions = [
        {
            id: 1,
            question: "요즘 나의 아침 상태는?",
            options: [
                {
                    text: "일어나기가 너무 힘들다.\n침대가 잡아당기는 느낌",
                    card: "꿀잠",
                },
                {
                    text: "몸은 일어났지만, 정신이 멈춘 기분이다",
                    card: "뇌세포",
                },
                {
                    text: "아침부터 걱정과 불안으로 머릿속이 바쁘다",
                    card: "멘탈",
                },
                { text: "출근 생각만 해도 벌써 지쳤다", card: "번아웃" },
            ],
        },
        {
            id: 2,
            question: "요즘의 나를 한 문장으로 표현하면?",
            options: [
                { text: "하루종일 졸립고 피곤하다", card: "꿀잠" },
                { text: "집중력 제로, 멍 때리는 중이다", card: "뇌세포" },
                { text: "작은 말에도 흔들리는 마음이다", card: "멘탈" },
                { text: "더는 불탈 에너지가 남아있지 않다", card: "번아웃" },
            ],
        },
        {
            id: 3,
            question: "주변에서 내게 많이 하는 말은?",
            options: [
                { text: '"너 피곤해보여."', card: "꿀잠" },
                {
                    text: '"무슨 생각해?" (사실 아무 생각도 없는데...)',
                    card: "뇌세포",
                },
                { text: '"너 생각보다 감정이 풍부하네."', card: "멘탈" },
                { text: '"좀 쉬면서 해."', card: "번아웃" },
            ],
        },
        {
            id: 4,
            question: "가장 자주 검색하는 고민은?",
            options: [
                { text: "쉽게 잠드는 법, 수면 방법", card: "꿀잠" },
                { text: "멍 때리기, 잡생각 없애는 법", card: "뇌세포" },
                { text: "감정 컨트롤, 불안 줄이는 법", card: "멘탈" },
                { text: "번아웃 극복법, 일상 회복 방법", card: "번아웃" },
            ],
        },
        {
            id: 5,
            question: "스트레스가 쌓였을 때 나는?",
            options: [
                { text: "아무것도 안 하고 멍때린다", card: "뇌세포" },
                { text: "잠을 자려고 노력한다", card: "꿀잠" },
                { text: "불안하고 예민해진다", card: "멘탈" },
                { text: "모든 게 지치고 무기력해진다", card: "번아웃" },
            ],
        },
        {
            id: 6,
            question: "쉬는 날 나의 모습은?",
            options: [
                { text: "자도 자도 피곤하다", card: "꿀잠" },
                { text: "생각없이 유튜브만 보고 있다", card: "뇌세포" },
                { text: "감정이 들쑥날쑥하다", card: "멘탈" },
                { text: "아무것도 안 하고 누워만 있다", card: "번아웃" },
            ],
        },
    ];

    const currentQuestionData = questions[currentQuestion - 1];
    const totalQuestions = questions.length;

    useEffect(() => {
        setProgress((currentQuestion / totalQuestions) * 100);
    }, [currentQuestion, totalQuestions]);

    const handleAnswerSelect = (answerIndex) => {
        if (isTransitioning) return; // 애니메이션 중에는 클릭 무시

        setSelectedAnswer(answerIndex);
        setIsTransitioning(true);

        // 답변 저장 (선택지 객체 전체 저장)
        const selectedOption = currentQuestionData.options[answerIndex];
        const newAnswers = [...answers];
        newAnswers[currentQuestion - 1] = selectedOption;
        setAnswers(newAnswers);

        // 선택된 버튼 하이라이트 후 버튼들 슬라이드 아웃
        setTimeout(() => {
            setButtonsSlideOut(true);

            // 버튼 슬라이드 아웃 완료 후 다음 질문으로 이동
            setTimeout(() => {
                if (currentQuestion < totalQuestions) {
                    // 버튼들을 완전히 숨김
                    setShowButtons(false);

                    // 즉시 다음 질문으로 변경하고 새 버튼들을 숨긴 상태로 표시
                    setTimeout(() => {
                        setCurrentQuestion(currentQuestion + 1);
                        setSelectedAnswer(null);
                        setButtonsSlideOut(false);

                        // 새 버튼들을 표시하고 즉시 슬라이드 인 애니메이션 시작
                        setTimeout(() => {
                            setShowButtons(true);
                            setIsTransitioning(false);
                        }, 50);
                    }, 50);
                } else {
                    // 테스트 완료, 결과 분석 후 결과 페이지로 이동
                    const finalAnswers = [...newAnswers];
                    const result = calculateResult(finalAnswers);

                    // 결과를 state로 전달하여 로딩 페이지로 이동
                    navigate("/loading", { state: { result } });
                }
            }, 600); // 모든 버튼이 슬라이드 아웃되는 시간
        }, 300); // 선택 효과를 보여주는 시간
    };

    // 결과 분석 로직
    const calculateResult = (finalAnswers) => {
        const cardCounts = {
            뇌세포: 0,
            꿀잠: 0,
            멘탈: 0,
            번아웃: 0,
        };

        // 각 보험카드별 선택 횟수 계산
        finalAnswers.forEach((answer) => {
            if (answer && answer.card) {
                cardCounts[answer.card]++;
            }
        });

        // 가장 많이 선택된 카드 찾기
        let maxCount = 0;
        let resultCard = "꿀잠"; // 기본값
        let lastSelectedCard = null;

        // 마지막 선택된 카드 기록 (동점일 때 사용)
        if (finalAnswers.length > 0 && finalAnswers[finalAnswers.length - 1]) {
            lastSelectedCard = finalAnswers[finalAnswers.length - 1].card;
        }

        Object.entries(cardCounts).forEach(([card, count]) => {
            if (count > maxCount) {
                maxCount = count;
                resultCard = card;
            } else if (count === maxCount && card === lastSelectedCard) {
                // 동점일 때 마지막 선택 기준
                resultCard = card;
            }
        });

        return {
            type: resultCard,
            counts: cardCounts,
            totalQuestions: finalAnswers.length,
        };
    };

    const handleBack = () => {
        if (isTransitioning) return; // 애니메이션 중에는 뒤로가기 무시

        if (currentQuestion > 1) {
            setIsTransitioning(true);
            setButtonsSlideOut(true);

            setTimeout(() => {
                setShowButtons(false);

                setTimeout(() => {
                    setCurrentQuestion(currentQuestion - 1);

                    // 이전 답변이 있다면 해당 선택지의 인덱스를 찾아서 설정
                    const prevAnswer = answers[currentQuestion - 2];
                    if (prevAnswer) {
                        const prevQuestionData = questions[currentQuestion - 2];
                        const answerIndex = prevQuestionData.options.findIndex(
                            (option) =>
                                option.card === prevAnswer.card &&
                                option.text === prevAnswer.text
                        );
                        setSelectedAnswer(
                            answerIndex !== -1 ? answerIndex : null
                        );
                    } else {
                        setSelectedAnswer(null);
                    }

                    setButtonsSlideOut(false);

                    setTimeout(() => {
                        setShowButtons(true);
                        setIsTransitioning(false);
                    }, 50);
                }, 50);
            }, 600);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="QuizPage">
            <div className="Logo">
                <div className="logoImage"></div>
            </div>

            <div className="QuizProgressText">
                <span className="now">{currentQuestion}</span>
                <span className="total">/{totalQuestions}</span>
            </div>

            <div className="ProgressBar">
                <span
                    style={{
                        paddingLeft: "5px",
                    }}
                    className="material-icons back"
                    onClick={handleBack}
                >
                    arrow_back_ios
                </span>
                <div className="ProgressBg">
                    <div
                        className="Progress"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="QuizContents">
                <div className="questionContainer">
                    <div className="QuizCount">
                        <div className="text">Q{currentQuestion}.</div>
                    </div>

                    <div className="textContainer">
                        <div className="QuizText">
                            {currentQuestionData.question}
                        </div>
                    </div>

                    <div
                        className={`buttons ${
                            buttonsSlideOut ? "slide-out" : "slide-in"
                        }`}
                    >
                        {showButtons &&
                            currentQuestionData.options.map((option, index) => (
                                <div
                                    key={`${currentQuestion}-${index}`}
                                    className={`btnContainer ${
                                        buttonsSlideOut
                                            ? "sliding-out"
                                            : "sliding-in"
                                    }`}
                                    style={{
                                        animationDelay: buttonsSlideOut
                                            ? `${index * 100}ms`
                                            : `${index * 150}ms`,
                                    }}
                                >
                                    <div
                                        className={`Button btnT2 ${
                                            selectedAnswer === index
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleAnswerSelect(index)
                                        }
                                    >
                                        <div
                                            className="btnIcon"
                                            style={{ display: "none" }}
                                        >
                                            <span className="material-icons"></span>
                                        </div>
                                        <div className="btnText">
                                            {option.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
