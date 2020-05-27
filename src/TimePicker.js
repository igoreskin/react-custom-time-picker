import React, { useState, useEffect } from 'react';

const TimePicker = () => {

  useEffect(() => { getCurrentTime() }, []);

  const [timeValue, setTimeValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);

  const inputStyle = isValid ? { width: "70px" } : { width: "70px", background: "red" };

  const getCurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    let minutes = date.getMinutes();
    minutes = (minutes < 10 ? "0" : "") + minutes;

    let time = `${hours}:${minutes}`;

    if (time.length < 5) time = "0" + time;

    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;
    let ampm = H < 12 ? " AM" : " PM";
    time = h + time.substr(2, 3) + ampm;
    setTimeValue(time);
  }

  const onTimeChange = event => {
    !enterPressed && setTimeValue(event.target.value);
  }

  const onEnter = event => {
    if (enterPressed) return;
    event.which = event.which || event.keyCode;
    if (event.which ===13) {
      onTimeSet(event);
      setEnterPressed(true);
    }
  }

  const resetValues = () => {
    setTimeValue("");
    setIsValid(true);
    setEnterPressed(false);
  }

  const onTimeSet = event => {
    let time = event.target.value;
    let AMPM = null;
    if (
      time.slice(-3) === " AM" 
      || time.slice(-3) === " PM" 
      || time.slice(-3) === " am" 
      || time.slice(-3) === " pm"
    ) {AMPM = time.slice(-3).toUpperCase(); time = time.slice(0, -3)}

    if (!time.includes(":") && (time.length === 3 || time.length === 4)) {
      const idx = time.length - 2;
      time = time.split('');
      time.splice(idx, 0, ":");
      time = time.join('');
    }

    if (time.length < 3) time = `${time}:00`;

    const regEx = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const isInputValid = time.match(regEx);
    setIsValid(isInputValid ? true : false);

    if(isInputValid) {
      if (time.length < 5) time = "0" + time;
      let H = +time.substr(0, 2);
      let h = (H % 12) || 12;
      h = (h < 10) ? ("0" + h) : h;
      let ampm = H < 12 ? " AM" : " PM";
      AMPM ? time = h + time.substr(2, 3) + AMPM : time = h + time.substr(2, 3) + ampm; 
      setTimeValue(time);
    } else {
      setTimeValue("")
    }
  }

  return (
    <div>
      <input 
        onChange={onTimeChange} 
        onKeyUp={onEnter}
        // onBlur={onTimeSet} 
        onFocus={resetValues}
        onClick={resetValues}
        value={timeValue} 
        style={inputStyle}
      />
      {enterPressed && <div style={{marginTop: "50px", fontSize: "300%"}}>{timeValue}</div>}
    </div>
  )
}

export default TimePicker;
