import { FC } from 'react';
import { useDispatch } from "react-redux";
import { setPageNumber } from '../redux/appSlice';

const Start: FC = () => {
    const dispatch = useDispatch();
    return (
        <div className='w-full h-screen bg-primary text-center grid place-items-center'>
            <button
                onClick={() => { dispatch(setPageNumber(1)) }}
                className='w-28 h-28 transition duration-200 hover:scale-110 bg-secondary text-primary shadow-2xl rounded-full font-semibold'
                aria-label="Start Quiz">Start Quiz</button>
        </div>
    )
}

export default Start;