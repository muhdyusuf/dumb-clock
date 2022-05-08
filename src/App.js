import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {FiPlusSquare,FiMinusSquare} from "react-icons/fi";
import { useState } from 'react';
import { TimerDisplay } from './component/TimerDisplay';

function App() {
  const [session,setSession]=useState(5)
  const [breaklength,setbreak]=useState(5)
  const [timer,setTimer]=useState(
    {

      isBreak:false,
      isActive:false,
    
    }
  )

 




  function handleBreak(val){
    if(timer.isActive)return
    if(val==="minus" && breaklength > 1){
    
      setbreak(val=>val-=1)
    }
    else if(val==="add" && breaklength<59){
      setbreak(val=>val+=1)
    }

  }
  function handlesession(val){
    if(timer.isActive)return
    if(val==="minus" && session > 1){
      setSession(val=>val-=1)
    }
    else if(val==="add" && session <59){
      setSession(val=>val+=1)
    }


  }

  let audio=document.getElementById("beep")

  function reset(){
    setSession(25)
    setbreak(5)
    setTimer({
      isBreak:false,
      isActive:false,
    })
    audio.pause()
    audio.currentTime=0


  }
  return (
    <div className="App bg-dark mh-100 mw-100 text-light text-center">
      <div className="timer-body">
        <h1 className="p-3">Pomodoro Clock</h1>
        <div className="d-flex justify-content-around">
          <div className="d-block">
            <p id="break-label">Break Label</p>
            <div className="row row-cols-3 align-items-center">
              <FiPlusSquare className="" onClick={()=>handleBreak("add")}/>
             <h3 id="break-length">{breaklength}</h3>
             <FiMinusSquare id="break-decrement" onClick={()=>handleBreak("minus")}/>


            </div>
          </div>
          <div className="d-block">
            <p id="session-label">Session Label</p>
            <div className="row row-cols-3 align-items-center">
              <FiPlusSquare className="" onClick={()=>handlesession("add")} id="session-increment"/>
             <h3 id="session-length">{session}</h3>
             <FiMinusSquare id="session-decrement" onClick={()=>handlesession("minus")}/>


            </div>
          </div>





        </div>
        {/* timer display */}

        {
          <TimerDisplay timer={timer} setTimer={setTimer} session={session} breaklength={breaklength} reset={reset}/>}




      </div>

  


      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;
