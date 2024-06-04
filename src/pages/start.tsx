import { FC } from 'react';
import { useDispatch } from "react-redux";
import { setPageNumber } from '../redux/appSlice';
import Button from '../components/Button';

const Start: FC = () => {
    const dispatch = useDispatch();

    const handleStartQuiz = () => {
        dispatch(setPageNumber(1));
    }

    return (
        <div className='page'>
            <main className='pageContainer'>
                <Button
                    className='w-40 h-40 lg:w-48 lg:h-48 xl:w-40 xl:h-40 bg-secondary text-primary text-2xl lg:text-3xl'
                    label='Start Quiz'
                    onClick={handleStartQuiz}>Start Quiz</Button>
            </main>
        </div>
    )
}

export default Start;
