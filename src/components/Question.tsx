type QuestionProps = {
    question: string;
}

export default function Question({ question }: QuestionProps) {
    return (
        <div className="h-72 w-full px-12 py-2 font-light text-3xl">
            {question}
        </div>
    )
}
