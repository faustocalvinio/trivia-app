"use client"
import { useState, useEffect } from "react";
import { getQuestion } from '../helpers/getQuestion'
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { NextPage } from "next";

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

const Home:NextPage = () => {
    const [answers, setAnswers] = useState([
      "Eric Clapton",
      "Madonna",
      "Mika",
      "David Bowie"
    ]);

    const [isLoading, setIsLoading] = useState(false)
    const [score, setScore] = useState(0);      
    const [questionData, setQuestionData] = useState(initialQuestion);

    const shuffleArray = (array:any) =>{
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useGetQuestion();
      console.log('clicked');
    };
   
    
    const onSelectAnswer=(e:any)=>{      
      if(e.target.value === questionData[0].correctAnswer){
        e.target.classList.remove('bg-blue-200');
        e.target.classList.remove('dark:bg-black');

        e.target.classList.add('bg-green-800') ; 
        setTimeout(() => {
            setScore(score+1);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useGetQuestion();
        }, 3000);  
        console.log(e.target.classList);
        
      }
      else {
        if(score!==0){
          // setScore(score-1);        
        }
        e.target.classList.remove('bg-blue-200');
        e.target.classList.remove('dark:bg-black');
        e.target.classList.add('bg-red-500');
       
      }      
    };
    useEffect(() => {
      const arr=[questionData[0].correctAnswer, ...questionData[0].incorrectAnswers];
      const arrShuffled=shuffleArray(arr);  
      setAnswers(arrShuffled);
      console.log(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[questionData]);
    
    return (      
      <>
        <h1 className="text-black dark:text-white">Trivia App</h1>                  
        <main className="min-h-[60vh] min-w-[1100px] bg-white relative flex flex-col  px-10 items-center justify-center border-2 border-blue-400 max-w-[1200px] mx-auto dark:bg-black max-sm:px-7 max-sm:w-[90%] dark:border-gray-600">   
          <div className="mx-auto flex flex-row justify-center text-center align-middle gap-5 items-center max-sm:flex-row absolute top-0">
            <button className="bg-transparent  text-black border-black  p-2 dark:bg-black dark:text-white w-fit border-2 dark:border-white mx-auto" onClick={onClickBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-reload" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                <path d="M20 4v5h-5"></path>
              </svg></button>   
            <h2 className="text-xl font-extrabold dark:text-white">Score: {score}</h2>
            <ThemeSwitcher />     
          </div>       
          <h3 className="dark:text-white">{questionData[0].category}</h3>
          <div className="inline-flex rounded-md shadow-sm mx-auto" role="group">            
            {questionData[0].tags.map(tag=><button key={crypto.randomUUID()} type="button" className="px-2 py-1 text-sm font-medium text-gray-900 bg-transparent border-[1px] border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                {tag}
            </button>)}            
          </div>       
          <h2 className="text-5xl font-bold text-center my-6  dark:text-white max-sm:text-3xl">{questionData[0].question}</h2>
          
          <div className="grid grid-cols-2  gap-2 gap-y-5 w-[100%] mx-auto max-sm:grid-cols-1">
            {            
             answers?.map(answer => (
              <button onClick={(e)=>onSelectAnswer(e)} value={answer} key={crypto.randomUUID()} className="bg-blue-200 rounded-xl w-[80%] mx-auto py-2 dark:bg-black dark:text-white border-2 dark:border-white text-xl max-sm:w-full max-sm:text-xl hover:shadow-2xl hover:shadow-gray-100 ">              
                {answer}
              </button>           
             ))
            }           
          </div>         
        </main>        
      </>
    )
}

export default Home