import { FC, memo } from "react";
import Option, { OptionType } from "./Option";

type OptionsProps = {
    handleOptionClick: (option: OptionType) => void;
    options: OptionType[];
    optionsOrder: number[];
    optionChosen: null | string;
    questionAnswered: boolean;
    quizTaken: boolean;
}

const Options: FC<OptionsProps> = ({ options, handleOptionClick, optionsOrder, optionChosen, questionAnswered, quizTaken }) => {
    return (<ul className={`${questionAnswered ? "optionsExiting" : ""} h-72`}>
        {optionsOrder.map((idx, index) => <Option
            key={index}
            index={idx}
            option={options[idx]}
            handleOptionClick={handleOptionClick}
            optionChosen={optionChosen}
            questionAnswered={questionAnswered}
            quizTaken={quizTaken} />)}
    </ul>)
}

export default memo(Options);
