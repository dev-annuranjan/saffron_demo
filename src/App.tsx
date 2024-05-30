import { useSelector } from 'react-redux';
import './App.css'
import Quiz from "./pages/quiz";
import Start from "./pages/start";
import Result from "./pages/result";
import { RootState } from './redux/store';


function App() {
  const { pageNumber } = useSelector((state: RootState) => state.app);

  const getPage = () => {
    if (pageNumber === 0) {
      return <Start />
    } else if (pageNumber === 1) {
      return <Quiz />
    } else if (pageNumber === 2) {
      return <Result />
    }
  }

  return (
    <>
      {getPage()}
    </>
  )
}

export default App
