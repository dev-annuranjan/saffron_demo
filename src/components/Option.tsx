import OptionType from "./Options";

export type OptionType = {
  label: string;
  isCorrect: boolean;
}

type OptionProps = {
  option: OptionType;
  optionChosen: string | null;
  handleOptionClick: (option: OptionType) => void;
}

export default function Option({ option, handleOptionClick, optionChosen }: OptionProps) {
  debugger
  const getStyles = () => {
    return (optionChosen === option.label) ?
      { background: "rgba(32, 86, 169)", padding: '4px', borderRadius: '4px', margin: "0.5rem" } :
      { background: "rgba(241, 86, 69)", padding: '4px', borderRadius: '4px', margin: "0.5rem", color: "white" }
  }

  return (
    <div onClick={() => handleOptionClick(option)} style={getStyles()}>
      {option.label}
    </div>
  )
}
