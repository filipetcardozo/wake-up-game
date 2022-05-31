import audio from "../Assets/wakeup-song.mp3"
import ReactAudioPlayer from 'react-audio-player';
import Button from '@mui/material/Button'
import { useEffect, useState } from "react";

const useAudio: any = () => {

    const [audioMusic]: any = useState(new Audio(audio));
    const [playing, setPlaying] = useState(true);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audioMusic.play() : audioMusic.pause();
    },
        [playing]
    );

    useEffect(() => {
        audioMusic.addEventListener('ended', () => setPlaying(false));
        return () => {
            audioMusic.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

export const WakeUpComponent = (params: any) => {
    let gameFinished = params.gameFinished

    const [playing, toggle] = useAudio();

    // Control the looping
    // const [gameFinished, setGameFinished] = useState(false)
    useEffect(() => {
        if (!playing && !gameFinished) toggle()
    }, [playing])

    useEffect(() => {
        if (gameFinished) toggle()
    }, [gameFinished])

    const handleStatusMusic = () => {
        toggle()
    }

    return <>
    </>
}