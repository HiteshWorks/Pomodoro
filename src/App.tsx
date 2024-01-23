import { useEffect, useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { GiNextButton } from "react-icons/gi";


function App() {
  const [bgcolor, setBgColor] = useState("bg-red-600");
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [goal, setGoal] = useState("Time to focus!");
  const [isStarted, setIsStarted] = useState(false);
  const [count , setCount] = useState(2);
  

  
  function handleClick(name: string) {
    if (name === "Pomodoro") {
      setIsStarted(false)
      
      setBgColor("bg-red-600 transtion-transform duration-1000");
      setMinutes(25);
      setSeconds(0);
      setCount(2);
      setGoal("Time to focus!");
    

    } else if (name === "shortBreak") {
      setIsStarted(false)
      setBgColor("bg-green-300 transtion-transform duration-1000");
      setMinutes(5);
      setSeconds(0);
      setCount(0);
      setGoal("Time for a break!");
    } 

    else if (name === "longBreak") {
      setIsStarted(false)
      setBgColor("bg-blue-300 transtion-transform duration-1000");
      setMinutes(15);
      setSeconds(0);
      setCount(1);
      setGoal("Time for a break!");
    }
  }

 
  function next(){
    if (count == 2){
      handleClick("shortBreak")
    }

      else if(count == 0){
   handleClick("longBreak")
      }

      else if(count == 1){
        handleClick("Pomodoro")
        
      }
      

  }

  useEffect(() => {
    let interval:any;
  
    if (isStarted && minutes >= 0 && seconds >= 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }, 1000);
    }
  
  
    return () => {
      clearInterval(interval);
    };
  
  }, [isStarted, minutes, seconds]);
  


  return (
    <>
      <div className={`container h-screen w-full ${bgcolor}`}>
        <div className="navbar flex justify-evenly gap-1">
          <div className="pomofocusandChecked flex">
            <div className="text-white mt-2">
              <ImCheckboxChecked />
            </div>
            <div className="text-white font-bold text-2xl">Pomofocus</div>
          </div>

          <div className="flex gap-4 text-white font-bold text-md">
            <div className="rounded-md px-6 py-1 border border-white">
              Report
            </div>
            <div className="rounded-md px-6 py-1 border border-white">
              Setting
            </div>
            <div className="rounded-md px-6 py-1 border border-white">Login</div>
          </div>
        </div>

        <div className="timeContainer flex flex-col h-80 w-[40%] text-lg font-semibold bg-red-300 mx-[30%] rounded-md mt-20">
          <div className="buttons p-2 flex gap-10 text-white justify-center">
            <button className= {` rounded-lg p-1 active:bg-yellow-700 ${count==2? `bg-gray-500` : ``}`} onClick={() => handleClick("Pomodoro")}>Pomodoro</button>
            <button className={`rounded-lg p-1 active:bg-yellow-700 ${count==0? `bg-gray-500` : ``}`}  onClick={() => handleClick("shortBreak")}>
              Short Break
            </button>
            <button className={`rounded-lg p-1 active:bg-yellow-700 ${count==1? `bg-gray-500` : ``}`} onClick={() => handleClick("longBreak")}>Long Break</button>
          </div>

          <div className="time text-9xl font-bold flex justify-center mt-[5%] text-white">
            {minutes > 9 ? minutes : `0${minutes}`}:
            {seconds > 9 ? seconds : `0${seconds}`}
          </div>

<div className="startnext flex ">

          <div
            onClick={() => setIsStarted((prev) => !prev)}
            title="Pause/Play"
            className="start cursor-pointer text-red-500 bg-white text-4xl font-bold border-b-4 rounded-lg border-gray-400 mt-9 mx-[30%] p-2 items-center px-16"
            >
            {!isStarted ? "Start" : "Pause"}
          </div>
            <span onClick={next} className={`text-6xl ${!isStarted ? `opacity-0` : `opacity-[100%]`} text-white mx-[-20%] mt-10`}><GiNextButton /></span>
        </div>
            </div>

        <div className="timeToFocus flex flex-col items-center justify-center mt-4">
          <div className="text-gray-200">#1</div>
          <div className="text-white text-xl font-semibold">{goal}</div>
        </div>
      </div>
    </>
  );
}

export default App;
