import { FC } from "react";
import type { OptionType } from "./Option";

export type QuestionType = {
    question: string;
    options: OptionType[];
}

type QuestionsStackProps = {
    questions: QuestionType[];
    questionAnswered: boolean;
}

const QuestionsStack: FC<QuestionsStackProps> = ({ questions, questionAnswered }) => {
    const getCards = () => {
        const cards = [];
        for (let i = questions.length - 1; i >= 0; i--) {
            cards.push(<li className={`questionCardListItem ${questionAnswered ? 'questionExiting' : ""} 
            h-72 px-12 py-2 font-light text-center text-2xl bg-secondary m-auto`} key={i}>
                {questions[i].question}
            </li>);
        }
        return cards;
    }
    
    return (<ul className="questionCardList w-full h-full">
        {getCards()}
    </ul>);
}

export default QuestionsStack;
