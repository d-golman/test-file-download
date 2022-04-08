
import { useEffect } from 'react';
import { useRef } from 'react';
import json from '../test';

const msToTime = (duration) => {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "," + milliseconds;
}

const parseJsonToStr = (data)=>{
  let result = "";
  data.forEach((block,index)=>{
    result += (index+1);
    result += ("\n");
    result += (`${msToTime(block["tStartMs"])} --> ${msToTime(block["tStartMs"]+block["dDurationMs"])}`);
    result += ("\n");
    result += (block["segs"][0]["utf8"]);
    result += ("\n");
    result += ("\n");    
  })
  return result
}

export default function App() {
    const a  = useRef(null)
    useEffect(()=>{
      if(a.current){
          const reslut = parseJsonToStr(json["subtitles"]["ru"]["events"])
          a.current.href = window.URL.createObjectURL(new Blob([reslut], {type: 'text/srt'}));
          a.current.download = 'test.srt';
        }
    },[a])
  
    return (
        <a ref={a}>download</a>
    );
}
