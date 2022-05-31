import React from 'react';
import { useState, useEffect } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { getSeconds } from 'date-fns';
import { WakeUpComponent } from './WakeUpComponent';
import { GameComponent } from './GameComponent'

function HomePage() {
    // Date now
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        const secondsTimer = setInterval(() => {
            setDateState(new Date());
        }, 1000);
        return () => clearInterval(secondsTimer);
    }, []);


    // Date timer
    const [value, setValue] = useState<Date | null>(new Date())
    useEffect(() => {
        if (value) {
            value.setSeconds(0)
            setValue(value)
        }
    }, [value])

    const [itsTimeToWakeUp, setItsTimeToWakeUp] = useState(false)
    useEffect(() => {
        if (value?.getHours() == dateState.getHours() && value?.getMinutes() == dateState.getMinutes() && value?.getSeconds() == dateState.getSeconds()) {
            console.log("WAKKEEE UPPP WAKEE UPP")
            if (!itsTimeToWakeUp) setItsTimeToWakeUp(true);
        }
    }, [dateState])

    // Count for the game
    const [countCorrectAnswers, setCountCorrectAnswers] = useState(0)
    const [gameFinished, setGameFinished] = useState(false)

    useEffect(() => {
        if (countCorrectAnswers == 3) {
            setGameFinished(true)
        }
    }, [countCorrectAnswers])
    return (
        <Box className="App">
            <Container maxWidth="lg">
                <Typography variant="h4" textAlign="center" fontWeight="bold">Welcome to Wake Up Game!</Typography>
                <Typography variant="h6" textAlign="center">{dateState.toLocaleTimeString("pt-BR")}</Typography>

                <Box display="flex" sx={{ my: 4 }} justifyContent="center">
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                        <MobileTimePicker
                            label="Alarm Clock"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>

                {!itsTimeToWakeUp ? "" :
                    <WakeUpComponent gameFinished={gameFinished} />
                }
                {gameFinished ?
                    <Box textAlign="center">
                        <Typography variant="h4">Congratulations!!!!</Typography>
                    </Box>
                    : <></>
                }
                {!gameFinished && itsTimeToWakeUp ? <GameComponent setCountCorrectAnswers={setCountCorrectAnswers} countCorrectAnswers={countCorrectAnswers} />
                    : <></>
                }
            </Container>
        </Box>);
}

export default HomePage;
