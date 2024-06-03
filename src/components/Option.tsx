import { useState } from 'react';
import OptionType from "./Options";

export type OptionType = {
  label: string;
  isCorrect: boolean;
}

type OptionProps = {
  option: OptionType;
  optionChosen: string | null;
  handleOptionClick: (option: OptionType) => void;
  index: number;
}

export default function Option({ option, handleOptionClick, optionChosen, index }: OptionProps) {

  const handleClickOnOption = (option: OptionType) => {
    handleOptionClick(option);
  }

  return (
    <li onClick={() => handleClickOnOption(option)}
      className='my-4 h-12 relative'>
      <span className={`${optionChosen === option.label ? "w-full" : "w-1"} absolute h-full bg-secondary left-0 z-[200] transition-all duration-150`}></span>

      <span className='flex justify-center items-center relative h-full z-[300] bg-transparent w-full'>
        <span className="absolute left-6">{String.fromCharCode(index + 97)}.</span>
        <span>{option.label}</span>
      </span>

      <span className='bg-accent1 z-0 left-0 top-0 absolute h-full w-full'></span>
    </li>
  )
}