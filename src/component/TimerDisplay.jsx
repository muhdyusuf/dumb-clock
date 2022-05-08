import React, { useEffect,useState,useRef} from 'react'
import {BsArrowClockwise} from 'react-icons/bs'

export const TimerDisplay = ({timer,setTimer,session,breaklength,reset}) => {
    const [timerId,setTimerId]=useState(null)
    const [pauseTime,setNewTime]=useState({
        minute:session,
        second:0,
    })
    const [isStart,setStart]=useState(false)
    

    useEffect(()=>{
        
        setNewTime({ 
        minute:session,
        second:0,})
        
    },[session])

   
    
    


     useEffect(()=>{ 
         console.log(isStart)
         let audio=document.getElementById("beep")
        
         let intervalId=null
         if(isStart){
            setTimer(Prev=>{
                return({...Prev,isActive:true})
            })
             
             intervalId=setInterval(() => {
               
                 audio.pause()
                 let newTime={...pauseTime}
                 newTime.minute-=1
                 setNewTime({...newTime})

                 
                 console.log(`pauseTime in loop:${pauseTime.minute}`)
                 
              
                 if(pauseTime<0){
                    audio.play()
                     setTimer(Prev=>{
                         return ({...Prev,isBreak:!Prev.isBreak})
                     })
                     
                     if(timer.isBreak){
                        setNewTime(breaklength)
                     }
                     else if(!timer.isBreak){
                         setNewTime(session)
                     }
                     console.log(pauseTime)
                 }
                 
             }, 1000);
             
             setTimerId(intervalId)
         }
         else{
             clearInterval(timerId)
             audio.pause()
         }



     }
     ,[isStart,pauseTime])

     function handleReset(){
         clearInterval(timerId)
         reset()
         setStart(false)
     }
    
     
    





    
  return (
    <div className='border my-3 p-3'>
        <h4 id="timer-label">{timer.isBreak? "Break" : "Session"}</h4>
        <h2 id="time-left" className="m-3">{pauseTime.minute +":"+ pauseTime.second}</h2>
        <button onClick={()=>setStart(!isStart)} className="btn btn-primary">{isStart? "pause" : "start"}</button>
        <button className='btn btn-outline-danger mx-1' onClick={handleReset} >
            <BsArrowClockwise/>
        </button>
        
    </div>
  )
}
