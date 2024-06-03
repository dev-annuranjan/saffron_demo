import { FC } from 'react';
import { useDispatch } from "react-redux";
import { setPageNumber } from '../redux/appSlice';

const Start: FC = () => {
    const dispatch = useDispatch();
    return (
        <div className='w-full h-screen bg-primary text-center grid place-items-center'>
            <button
                onClick={() => { dispatch(setPageNumber(1)) }}
                className='button-hover-effect sm:hover:scale-110 w-40 h-40 lg:w-48 lg:h-48 xl:w-40 xl:h-40 bg-secondary text-primary text-2xl lg:text-3xl'
                aria-label="Start Quiz">Start Quiz</button>
        </div>
    )
}

export default Start;