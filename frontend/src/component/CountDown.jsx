import React, { useState, useEffect } from 'react';

const CountDown = ({targetDate}) => {
    const [countdown,setcountdown] = useState("")
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date(); // Current date and time
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                
                setcountdown(<p><label className='mb-2'>{days} Days, {hours} Hours</label><br/><label>{minutes} Minutes, {seconds} Seconds</label></p>)
            } else {
                setcountdown("")
                clearInterval(timer)
            }
        };

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);
    return(
        <div className="card border-0" style={{background:"rgba(0,0,0,0)"}}>
            <div className="card-body">
                <img src="https://img.clipart-library.com/2/clip-clock-gif/clip-clock-gif-11.gif" alt="Waiting Time Seminar Kalkulus" width={"60%"} />
                <h4 className='fw-bold mt-3' style={{fontFamily:"Poppins"}}>{countdown}</h4>
            </div>
        </div>
    )
}

export default CountDown