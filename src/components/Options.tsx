import Option, { OptionType } from "./Option";

type OptionsProps = {
    handleOptionClick: (option: OptionType) => void;
    options: OptionType[];
    optionsOrder: number[];
    optionChosen: null | string;
}

export default function Options({ options, handleOptionClick, optionsOrder, optionChosen }: OptionsProps) {
    debugger;
    return (
        <div style={{ background: "rgba(234, 45, 98, 0.5)", padding: "1.5rem" }}>
            {optionsOrder.map((idx, index) => <Option
                key={index}
                option={options[idx]}
                handleOptionClick={handleOptionClick} 
                optionChosen={optionChosen}/>)}
        </div>
    )
}
