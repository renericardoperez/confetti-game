import React, {useEffect} from 'react';
import './Confetti.css';
import {startAnimation, cancelAnimation} from './confetti.core'
import confettiCannonPop from './cannon-pop.mp3';
import confettiVoiceAndPop from './pop-and-voice.mp3';

const Confetti = ({show}) => {
    const ref = React.useRef(null);

    const playSound = (url) =>{
        const audio = new Audio(url);
        audio.play();
    }

    const handleStart = () => {
        startAnimation(ref.current, window.innerWidth);
        playSound(confettiCannonPop);
        playSound(confettiVoiceAndPop);
    }
    const handleCancel = () => {
        cancelAnimation();
    }

    useEffect(() => {
        if (show) {
            handleStart();
        } else {
            handleCancel();
        }
    }, [show]);

    return (
                <canvas ref={ref} className="confetti-canvas"/>
    );
};

export default Confetti;