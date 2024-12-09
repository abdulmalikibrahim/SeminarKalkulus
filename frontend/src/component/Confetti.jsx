import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const Confetti = ({confetti}) => {
    const largeProps = {
      force: 0.8,
      duration: 3000,
      particleCount: 400,
      width: 1800,
      colors: ['#0bc9d6', '#e010d6', '#181bed', '#f0211a', '#f5b522'],
      zIndex:1000,
    };

    return (
        <>
        {confetti && <ConfettiExplosion {...largeProps}/>}
        </>
    )
}

export default Confetti;