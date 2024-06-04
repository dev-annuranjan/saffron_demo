import { FC } from "react";

export type OptionType = {
  label: string;
  isCorrect: boolean;
}

type OptionProps = {
  option: OptionType;
  optionChosen: string | null;
  handleOptionClick: (option: OptionType) => void;
  index: number;
  questionAnswered: boolean;
  quizTaken: boolean;
}

const Option: FC<OptionProps> = ({ option, handleOptionClick, optionChosen, index, questionAnswered, quizTaken }) => {
  console.log(quizTaken, optionChosen,);
  return (
    <li onClick={() => handleOptionClick(option)}
      className='my-4 h-12 relative cursor-pointer'
      tabIndex={index + 2}
    >
      <span className={`${optionChosen === option.label ? "w-full" : "w-1"} 
      ${questionAnswered && optionChosen === option.label ? "optionChosen" : ""}
      absolute h-full bg-secondary left-0 z-[200]`}></span>

      <span className={`${quizTaken && optionChosen === option.label && !option.isCorrect ? "bg-wrong" : 'bg-transparent'} flex justify-center items-center relative h-full z-[300] w-full`}>
        <span className="absolute left-6">{String.fromCharCode(index + 97)}.</span>
        <span>{option.label}</span>
      </span>

      <span className='bg-accent1 z-0 left-0 top-0 absolute h-full w-full'></span>
    </li >
  )
}

export default Option;
