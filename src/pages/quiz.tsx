import { useEffect, useState, FC, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importing JSON Data and SVG assets
import { questions } from "../data/questions.json";
import Left from "../assets/left.svg";
import Right from "../assets/right.svg";

// Importing UIComponent and Types
import QuestionsStack, { QuestionType } from "../components/QuestionsStack";
import Options from "../components/Options";
import { OptionType } from "../components/Option";
import { RootState } from "../redux/store";
import ButtonArrow from "../components/ButtonArrow";

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

    // Hard Limit set for number of cards in stack is 3;
    const [cardDataStack, setCardDataStack] = useState<QuestionType[]>(prevPage === 2 ? [questions[questionOrder[questions.length - 1]]] : [questions[questionOrder[0]], questions[questionOrder[1]], questions[questionOrder[2]]]);
    const [questionAttempted, setQuestionAttempted] = useState<boolean>(false);

    useEffect(() => {
        // Condition because there is no need to update the store when we are returning from the result page
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

        const newCardDataStack: QuestionType[] = cardDataStack.slice(1);
        if (questionNumber + 3 < questions.length) newCardDataStack.push(questions[questionOrder[questionNumber + 3]]);
        setCardDataStack(newCardDataStack);
    }

    const goToPrevQuestion = () => {
        if (questionNumber > 0) {
            setQuestionNumber(prev => prev - 1);
            const newCardDataStack = [questions[questionOrder[questionNumber - 1]], ...cardDataStack];
            if (newCardDataStack.length > 3) newCardDataStack.pop();
            setCardDataStack(newCardDataStack);
        }
    }

    const handleOptionClick = (option: OptionType) => {
        if (!optionsChosen[questionNumber]) {
            const newOptionArray: string[] = [...optionsChosen];
            newOptionArray[questionNumber] = option.label;
            dispatch(setOptionsChosen(newOptionArray));
            if (option.isCorrect) dispatch(setScoreInStore(score + 1));
            setQuestionAttempted(true);
            setTimeout(() => {
                goToNextQuestion();
                setQuestionAttempted(false);
                // Delaying for button and transition animation
            }, 400);
            if (!quizTaken) setQuestionsAttempted(questionsAttempted + 1);
        }
    }

    const showForwardButton: () => boolean = () => {
        let count = 0;
        optionsChosen.forEach(x => { if (x) count++; })
        return (questionsAttempted !== 0 && questionNumber < questionsAttempted) || count === questions.length;
    }
debugger;
console.log(cardDataStack);
console.log(questionOrder);
console.log(questions[questionOrder[questionNumber]].options);

    return (
        <div className="page">
            <main className="page-container flex flex-col">
                <section className="px-6 mt-10 grow-0">
                    <div className="flex justify-between">
                        <ButtonArrow
                            imgSrc={Left}
                            label="prev question"
                            imgLabel="left arrow"
                            onClick={goToPrevQuestion}
                            className={`${questionNumber ? "inline" : "invisible"}`}
                            tabIndex={0}
                        />

                        <div>
                            <span className="font-semibold text-2xl">{formatNumber(questionNumber + 1)}</span>
                            <span className="text-slate-200">/ {questionNumberString}</span>
                        </div>

                        <ButtonArrow
                            imgSrc={Right}
                            label="next question"
                            imgLabel="right arrow"
                            onClick={goToNextQuestion}
                            className={`${showForwardButton() ? "inline-block" : "invisible"}`}
                            tabIndex={1}
                        />
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

                <section className="px-6 overflow-hidden h-72 grow-0">
                    <QuestionsStack questions={cardDataStack} questionAnswered={questionAttempted} />
                </section>
                <section className="bg-primary px-4 pt-12 pb-4 overflow-y-hidden flex-grow shrink">
                    <Options
                        options={questions[questionOrder[questionNumber]].options}
                        handleOptionClick={handleOptionClick}
                        optionsOrder={optionsOrderArray[questionOrder[questionNumber]]}
                        optionChosen={optionsChosen[questionNumber]}
                        questionAnswered={questionAttempted}
                        quizTaken={quizTaken}
                    />
                </section>
            </main>
        </div >
    )
}

export default Quiz;
