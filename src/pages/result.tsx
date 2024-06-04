import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../redux/appSlice";
import { RootState } from "../redux/store";
import { formatNumber } from "../utility/randomArray";
import Button from "../components/Button";

const Result: FC = () => {
    const dispatch = useDispatch();
    const { score, totalScore } = useSelector((state: RootState) => state.quiz);

    return (
        <div className="page">
            <main className="page-container h-[48rem] bg-primary relative">
                <Button
                    className="mt-24 p-4 rounded-full text-primary bg-secondary"
                    label="Go Back"
                    tabIndex={0}
                    onClick={() => dispatch(setPageNumber(1))}
                >Go Back</Button>

                <section className="text-center text-secondary font-semibold mx-24 my-24">
                    <p className="my-4">YOUR SCORE</p>
                    <p className="">
                        <span className="text-6xl">{formatNumber(score)}</span>
                        <span className="mx-2">/</span>
                        <span className="text-4xl">{formatNumber(totalScore)}</span>
                    </p>
                </section>

                <section className="absolute bottom-16 left-0 w-full text-center">
                    <Button
                        className="text-secondary text-xs p-4 shadow-none"
                        label="Refresh Page"
                        onClick={() => window.location.reload()}
                    >Refresh to play again</Button>
                </section>
            </main>
        </div>
    )
}

export default Result;
