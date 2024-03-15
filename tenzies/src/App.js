
import './App.css';
import Die from "./components/Die";
import React, {useState, useEffect} from "react"
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

function App() {
  const[dice, setDice] = useState(allNewDice())
  const[tenzies, setTenzies] = useState(false)

  useEffect(()=>{
  
    const held = dice.every(die=>die.isHeld);
    const first = dice[0].number
    const number = dice.every(die=>die.number===first);

    if (held && number){
      setTenzies(true);
      console.log("ganaste")
    }

  }, [dice])

  function allNewDice(){
    var diceArray = []
  
    for (let i=0;i<10;i++){
      let newNum = Math.floor(Math.random()*6)+1
      diceArray.push({
        number:newNum,
        isHeld:false,
        id:nanoid()
      });
    }

    return diceArray
  }

  function hold(id){
      const newArray = dice.map(die=>{
          if(die.id===id) {
            return {...die, isHeld:!die.isHeld}
          }else{
            return die
          }
      })

      setDice(newArray)
  }


  const diceElements = dice.map((die)=>{
    return <Die num={die.number} key={die.id} isHeld={die.isHeld} click={()=>hold(die.id)}/>
  })

  function roll(){
    setDice(prevDice=>prevDice.map(die=>{
      return die.isHeld ? die : {...die, number:Math.floor(Math.random()*6)+1}
    }))
  }
  return (
    
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className="container">
      {diceElements}
     </div>

     <button onClick={tenzies ? ()=>{
      setDice(allNewDice())
      setTenzies(false)
    }:
      roll} className='button-roll'>{tenzies?"Reset":"Roll"}</button>
    </main>
  );
}

export default App;
