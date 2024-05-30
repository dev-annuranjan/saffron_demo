import { useEffect, useState, FC } from "react";
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
import { generateRandomList, generateRandomOptionOrder } from "../utility/randomArray";

const Quiz: FC = () => {
    const { questionOrder: questionOrderInStore, optionsOrder: optionsOrderInStore, score, optionsChosen } = useSelector((state: RootState) => state.quiz);
    const { quizTaken, prevPage } = useSelector((state: RootState) => state.app);

    const [questionNumber, setQuestionNumber] = useState<number>(prevPage === 2 ? questions.length - 1 : 0);
    const [questionsAttempted, setQuestionsAttempted] = useState<number>(0);
    const [questionOrder] = useState<number[]>(
        questionOrderInStore.length ? questionOrderInStore : generateRandomList(questions.length));
    const [optionsOrderArray] = useState<number[][]>(
        optionsOrderInStore.length ? optionsOrderInStore : generateRandomOptionOrder(questions));

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
            goToNextQuestion();
            if (!quizTaken) setQuestionsAttempted(questionsAttempted + 1);
        }
    }

    return (
        <div>
            <header>
                <div>Score: {score}</div>
                <div>
                    <button aria-label="previous question" onClick={goToPrevQuestion}>
                        <img src={Left} style={{ height: "24px", width: "24px" }} alt="left-arrow" />
                    </button>
                    <span>{questionNumber + 1} / {questions.length}</span>
                    {questionsAttempted !== 0 && questionNumber < questionsAttempted &&
                        <button aria-label="next question" onClick={goToNextQuestion}>
                            <img src={Right} style={{ height: "24px", width: "24px" }} alt="right-arrow" />
                        </button>}
                </div>
                <progress max={questions.length} value={questionNumber + 1} aria-label="quiz-progress"> </progress>
            </header>

            <main>
                <section>
                    <Question question={questions[questionOrder[questionNumber]].question} />
                </section>
                <section>
                    <Options
                        options={questions[questionOrder[questionNumber]].options}
                        handleOptionClick={handleOptionClick}
                        optionsOrder={optionsOrderArray[questionOrder[questionNumber]]}
                        optionChosen={optionsChosen[questionNumber]}
                    />
                </section>
            </main>
        </div>
    )
}

export default Quiz;


