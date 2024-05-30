type QuestionProps = {
    question: string;
}

export default function Question({ question }: QuestionProps) {
    return (
        <div>
            {question}
        </div>
    )
}
