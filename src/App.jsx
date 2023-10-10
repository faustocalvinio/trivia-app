import { useState } from "react"
import { useEffect } from "react"
import { getQuestion } from "./helpers/getQuestion"
import { ThemeSwitcher } from "./components/ThemeSwitcher"

const initialQuestion = [{
  "category": "Music",
  "id": "622a1c357cc59eab6f94fef2",
  "correctAnswer": "David Bowie",
  "incorrectAnswers": [
      "Eric Clapton",
      "Madonna",
      "Mika"
  ],
  "question": "Who released the iconic album 'Ziggy Stardust'?",
  "tags": [
      "musicians",
      "music_albums",
      "music"
  ],
  "type": "Multiple Choice",
  "difficulty": "easy",
  "regions": [],
  "isNiche": false
}]

function App() {
    const [answers, setAnswers] = useState([
      "Eric Clapton",
      "Madonna",
      "Mika",
      "David Bowie"
  ])
    const [isLoading, setIsLoading] = useState(false)
    const [score, setScore] = useState(0)
    // const [error, setError] = useState(null]
    const [questionData, setQuestionData] = useState(initialQuestion)

    function shuffleArray(array) {
      console.log(array);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const useGetQuestion = async () => {
      setIsLoading(true);
      const data = await getQuestion();
      setQuestionData(data);    
      setIsLoading(false);
      return data;    
    }

    useEffect(() => {
      const arr=[questionData[0].correctAnswer, ...questionData[0].incorrectAnswers];
      const arrShuffled=shuffleArray(arr);  
      setAnswers(arrShuffled);
      console.log(answers);
    },[questionData])

    const onClickBtn=()=>{
      useGetQuestion();
      console.log('clicked');
    }
   

    const onSelectAnswer=(e)=>{
      console.log(e.target.value);
      console.log(e);
      if(e.target.value === questionData[0].correctAnswer){
        console.log('won');
        setScore(score+1);
        // e.target.style.backgroundColor='green';
        e.target.classList.remove('bg-gray-950')
        e.target.classList.add('bg-gray-200')
        console.log(e.target.classList)

      }else{
        if(score!==0){
          setScore(score-1);        
        }
        e.target.classList.remove('bg-gray-950')
        e.target.classList.add('bg-red-500')
      }
      setTimeout(() => {
        useGetQuestion();
      }, 30000);
    }

    return (
      <>
        { isLoading ? <h1 className="text-5xl text-black">Loading...</h1> : null}
         <>
         <header className="max-w-[1300px] mx-auto">
            <h1 className="text-5xl font-extrabold ">Works</h1>
            <h1 className="text-5xl font-extrabold ">{score}</h1>
            <ThemeSwitcher />
         </header>
           
        <main className="bg-gray-200 max-w-[1300px] mx-auto dark:bg-gray-900">
          <button className="bg-green-800 text-white p-5" onClick={onClickBtn}>  Get</button>
          <h5 className="text-xl w-full ">difficulty {questionData[0].difficulty}</h5>
          <h2 className="text-3xl font-bold text-center bg-red-200 dark:text-white dark:bg-gray-800">Question {questionData[0].question}</h2>
          <h4>category {questionData[0].category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {            
             answers?.map(answer => (
              <button onClick={(e)=>onSelectAnswer(e)} value={answer} key={crypto.randomUUID()} className="bg-gray-950 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                {answer}
              </button>
           
             ))
            }
           
          </div> 
        </main></>
      
      </>
    )
}

export default App
