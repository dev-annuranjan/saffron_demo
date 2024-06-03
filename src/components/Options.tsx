import { FC, memo } from "react";
import Option, { OptionType } from "./Option";

type OptionsProps = {
    handleOptionClick: (option: OptionType) => void;
    options: OptionType[];
    optionsOrder: number[];
    optionChosen: null | string;
}

const Options: FC<OptionsProps> = ({ options, handleOptionClick, optionsOrder, optionChosen }) => {
    return (<ul className="align-middle">
        {optionsOrder.map((idx, index) => <Option
            key={index}
            index={idx}
            option={options[idx]}
            handleOptionClick={handleOptionClick}
            optionChosen={optionChosen} />)}
    </ul>)
}

export default memo(Options);
