import { useEffect, useState, FC, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing JSON Data and SVG assets
import { questions } from "../data/questions.json";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";

// Importing UIComponent and Types
import Question from "../components/Question";
import Options from "../components/Options";
import { OptionType } from "../components/Option";
import { RootState } from "../redux/store";

// Importing actions from App and Quiz Slices
import {
    setQuestionOrder as setQuestionOrderInStore,
    setScore as setScoreInStore,
    setTotalScore, setOptionsChosen,
    setOptionsOrder as setOptionsOrderInStore
} from "../redux/quizSlice";
import { setPageNumber, setQuizTakenState } from "../redux/appSlice";

// Utility functions for randomization
import { generateRandomList, generateRandomOptionOrder, formatNumber } from "../utility/randomArray";

const Quiz: FC = () => {
    const { questionOrder: questionOrderInStore, optionsOrder: optionsOrderInStore, score, optionsChosen } = useSelector((state: RootState) => state.quiz);
    const { quizTaken, prevPage } = useSelector((state: RootState) => state.app);

    const [questionNumber, setQuestionNumber] = useState<number>(prevPage === 2 ? questions.length - 1 : 0);
    const [questionsAttempted, setQuestionsAttempted] = useState<number>(0);
    const [questionOrder] = useState<number[]>(
        questionOrderInStore.length ? questionOrderInStore : generateRandomList(questions.length));
    const [optionsOrderArray] = useState<number[][]>(
        optionsOrderInStore.length ? optionsOrderInStore : generateRandomOptionOrder(questions));

    const questionNumberString = useMemo(() => formatNumber(questions.length), [questions]);

    const dispatch = useDispatch();

    useEffect(() => {
        // Conditions cause there is no need to update the store when we are returning from the result page
        if (!questionOrderInStore.length) {
            dispatch(setTotalScore(questions.length));
            dispatch(setOptionsChosen(new Array(questions.length).fill(null)));
            dispatch(setQuestionOrderInStore(questionOrder));
            dispatch(setOptionsOrderInStore(optionsOrderArray));
        }
    }, []);

    const goToNextQuestion = () => {
        if (questionNumber === questions.length - 1) {
            dispatch(setQuizTakenState(true));
            dispatch(setPageNumber(2));
        } else {
            setQuestionNumber(prev => prev + 1);
        }
    }

    const goToPrevQuestion = () => {
        if (questionNumber > 0) setQuestionNumber(prev => prev - 1);
    }

    const handleOptionClick = (option: OptionType) => {
        if (!optionsChosen[questionNumber]) {
            const newOptionArray: string[] = [...optionsChosen];
            newOptionArray[questionNumber] = option.label;
            dispatch(setOptionsChosen(newOptionArray));
            if (option.isCorrect) dispatch(setScoreInStore(score + 1));
            setTimeout(() => {
                goToNextQuestion();
            }, 200);
            if (!quizTaken) setQuestionsAttempted(questionsAttempted + 1);
        }
    }

    const showForwardButton: () => boolean = () => {
        let count = 0;
        optionsChosen.forEach(x => { if (x) count++; })
        return (questionsAttempted !== 0 && questionNumber < questionsAttempted) || count === questions.length;
    }

    return (
        <div className="page">
            <main className="page-container flex flex-col">
                <section className="px-6 mt-10">
                    <div className="flex justify-between">
                        <button aria-label="previous question" onClick={goToPrevQuestion} className={`${questionNumber ? "inline" : "invisible"} h-fit w-fit self-center`}>
                            <img src={Left} className="h-4 w-4" alt="left-arrow" />
                        </button>
                        <div><span className="font-semibold text-2xl">{formatNumber(questionNumber + 1)}</span><span className="text-slate-200">/ {questionNumberString}</span></div>

                        <button aria-label="next question" onClick={goToNextQuestion}
                            className={`${showForwardButton() ? "inline-block" : "invisible"} h-fit w-fit self-center`}>
                            <img src={Right} className="h-4 w-4" alt="right-arrow" />
                        </button>
                    </div>
                    <div>
                        <progress
                            max={questions.length}
                            value={questionNumber + 1}
                            aria-label="quiz-progress"
                            className="bg-slate-300 rounded-lg &::-webkit-progress-bar:bg-slate-300 &::-webkit-progress-value:bg-rose-400
                                    w-full h-1 bg-rose-700 my-4" />
                    </div>
                </section>

                <section className="px-6">
                    <Question question={questions[questionOrder[questionNumber]].question} />
                </section>
                <section className="bg-primary bg-opacity-94 px-4 pt-16 pb-4 overflow-auto ::-webkit-scrollbar-track flex-grow">
                    <Options
                        options={questions[questionOrder[questionNumber]].options}
                        handleOptionClick={handleOptionClick}
                        optionsOrder={optionsOrderArray[questionOrder[questionNumber]]}
                        optionChosen={optionsChosen[questionNumber]}
                    />
                </section>
            </main>
        </div >
    )
}

export default Quiz;


