import { useState, useEffect } from "react";
import { getQuestion } from "./helpers/getQuestion";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

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
    const [score, setScore] = useState(0);
    // const [message, setMessage] = useState('');    
    const [questionData, setQuestionData] = useState(initialQuestion);

    const shuffleArray = (array) =>{
      console.log(array);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const useGetQuestion = async () => {
      setIsLoading(true);
      const data = await getQuestion();
      setQuestionData(data);    
      setIsLoading(false);
      return data;    
    };    

    const onClickBtn=()=>{
      useGetQuestion();
      console.log('clicked');
    };
   

    const onSelectAnswer=(e)=>{      
      if(e.target.value === questionData[0].correctAnswer){
        e.target.classList.remove('bg-blue-200');
        e.target.classList.remove('dark:bg-black');

        e.target.classList.add('bg-green-800') ; 
        setTimeout(() => {
            setScore(score+1);
            useGetQuestion();
        }, 3000);    
        // e.target.style.backgroundColor='green';
        console.log(e.target.classList);
        // setMessage(`You won with the answer ${e.target.value}`)
      }
      else {
        if(score!==0){
          // setScore(score-1);        
        }
        e.target.classList.remove('bg-blue-200');
        e.target.classList.remove('dark:bg-black');

        e.target.classList.add('bg-red-500');
        // setMessage('You lost')        
      }      
    };
    useEffect(() => {
      const arr=[questionData[0].correctAnswer, ...questionData[0].incorrectAnswers];
      const arrShuffled=shuffleArray(arr);  
      setAnswers(arrShuffled);
      console.log(answers);
    },[questionData]);
    
    return (      
      <>
         <header className="max-w-[1300px] mx-auto flex flex-col justify-center text-center">    
         <button className="bg-green-800 text-white p-5 dark:bg-black w-fit border-2 dark:border-white mx-auto" onClick={onClickBtn}>  Get</button>        
            <h4 className="text-5xl font-extrabold dark:text-white">{score}</h4>
            <h4 className="dark:text-white">usar los tags de la api</h4>           
            <ThemeSwitcher />
         </header>           
        <main className="min-h-[50vh] flex flex-col border-2 border-blue-400 max-w-[1200px] mx-auto dark:bg-black max-sm:px-7 max-sm:w-[90%]">          
          <div className="inline-flex rounded-md shadow-sm mx-auto my-4" role="group">            
            {questionData[0].tags.map(tag=><button key={crypto.randomUUID()} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-[1px] border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                {tag}
            </button>)}            
          </div>       
          <h2 className="text-5xl font-bold text-center mt-2  dark:text-white ">{questionData[0].question}</h2>
          <h3 className="dark:text-white">category {questionData[0].category}</h3>
          <div className="grid grid-cols-2 gap-2 gap-y-5 w-[100%] mx-auto max-sm:grid-cols-1">
            {            
             answers?.map(answer => (
              <button onClick={(e)=>onSelectAnswer(e)} value={answer} key={crypto.randomUUID()} className="bg-blue-200 rounded-xl w-[80%] mx-auto py-2 dark:bg-black dark:text-white border-2 dark:border-white text-xl max-sm:w-full max-sm:text-2xl">              
                {answer}
              </button>           
             ))
            }           
          </div>         
        </main>        
      </>
    )
}

export default App
