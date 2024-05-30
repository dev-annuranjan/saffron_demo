import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber } from "../redux/appSlice";
import { RootState } from "../redux/store";

const Result: FC = () => {
    const dispatch = useDispatch();
    const { score, totalScore } = useSelector((state: RootState) => state.quiz);

    return (
        <div>
            <span onClick={() => dispatch(setPageNumber(1))}>Go Back</span>
            <div>
                Your Score is: {score} / {totalScore}
            </div>
        </div>
    )
}

export default Result;
