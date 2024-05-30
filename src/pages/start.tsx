import { FC } from 'react';
import { useDispatch } from "react-redux";
import { setPageNumber } from '../redux/appSlice';

const Start: FC = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <span onClick={() => { dispatch(setPageNumber(1)) }}>Start Page</span>
        </div>
    )
}

export default Start;