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
    const [answers, setAnswers] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState(null]
    const [questionData, setQuestionData] = useState(initialQuestion)

    const fetche = async () => {
      setIsLoading(true)
      const data = await getQuestion()
      setQuestionData(data)
      console.log(data)
      setIsLoading(false)
      return data;      

    }

    useEffect(() => {     
      console.log('changed');
    }, [questionData])
    

    const onClickBtn=()=>{
      fetche()
    
    }

    return (
      <>
        { isLoading ? <h1 className="text-5xl text-black">Loading...</h1> : null}
         <>
           <h1 className="text-5xl font-extrabold">Works</h1>
        <ThemeSwitcher />
        <main className="bg-gray-200">
          <button className="bg-green-800 text-white p-5" onClick={onClickBtn}>  Get</button>
          <h2 className="text-3xl font-bold">Question {questionData[0].question}</h2>
          <h5 className="text-xl">difficulty {questionData[0].difficulty}</h5>
          <h4>category {questionData[0].category}</h4>
          <div className="grid grid-cols-2 gap-2">
            {
            //  JSON.stringify(questionData[0].incorrectAnswers)
             questionData[0].incorrectAnswers.map(answer => (<div key={crypto.randomUUID()} className="text-5xl text-black">{answer}</div>))
            }
            <div className="text-5xl text-black">{questionData[0].correctAnswer}</div>
          </div> 
        </main></>
      
      </>
    )
}

export default App
