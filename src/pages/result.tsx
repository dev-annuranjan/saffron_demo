import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../redux/appSlice";
import { RootState } from "../redux/store";
import { formatNumber } from "../utility/randomArray";

const Result: FC = () => {
    const dispatch = useDispatch();
    const { score, totalScore } = useSelector((state: RootState) => state.quiz);

    return (
        <div className="page">
            <main className="page-container h-screen bg-primary relative">
                <button
                    onClick={() => dispatch(setPageNumber(1))}
                    className="button-hover-effect bg-secondary mt-24 p-4 rounded-full text-primary"
                >Go Back</button>
                <section className="text-center text-secondary font-semibold mx-24 my-24">
                    <p className="my-4">YOUR SCORE</p>
                    <p className="">
                        <span className="text-6xl">{formatNumber(score)}</span><span className="mx-2">/</span> <span className="text-4xl">{formatNumber(totalScore)}</span>
                    </p>
                </section>
                <section className="text-secondary text-xs absolute bottom-16 left-0 w-full text-center">
                    <p>Refresh to play again</p>
                </section>
            </main>
        </div>
    )
}

export default Result;
