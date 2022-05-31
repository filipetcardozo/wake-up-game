import { useEffect, useState } from "react"
import { easyRiddlesData } from "../Data/RiddlesData"
import Box from '@mui/material/Box'
import { RiddleInterface } from "../Interface/RiddleInterface"
import Typography from '@mui/material/Typography'

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export const GameComponent = (params: any) => {
    // 0 - Import the Riddles
    const [easyRiddles, setEasyRiddles] = useState<RiddleInterface[]>(easyRiddlesData)

    // 1 - Status for the game
    const [gameFinished, setGameFinished] = useState(false)

    // 2 - Count of correct answers
    // const [countCorrectAnswers, setCountCorrectAnswers] = useState(0)
    let countCorrectAnswers = params.countCorrectAnswers
    let setCountCorrectAnswers = params.setCountCorrectAnswers

    // 3 - Create a key Alredy Show for each Riddle 
    useEffect(() => {
        easyRiddles.map((value: any, index: number) => {
            value.alredyShowRiddle = false
        })

        easyRiddles.sort(randomSort)
        function randomSort(a: any, b: any) {
            return 0.5 - Math.random()
        }

        setRiddleToShow(easyRiddles[0])
        setEasyRiddles([...easyRiddles])
    }, [])

    // 4 - Component to show the first Riddle
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Choose wisely');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };

    const changeRiddleToShow = () => {
        let indexOfRiddle = easyRiddles.findIndex(riddle => riddle.riddle === riddleToShow.riddle)
        easyRiddles[indexOfRiddle].alredyShowRiddle = true
        setEasyRiddles([...easyRiddles])

        let nextToShow = easyRiddles.filter(riddle => !riddle.alredyShowRiddle)
        nextToShow.sort()

        nextToShow.sort(randomSort)
        function randomSort(a: any, b: any) {
            return 0.5 - Math.random()
        }

        setRiddleToShow(nextToShow[1])
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (answer === riddleToShow?.answer) {
            setHelperText('You got it!');
            setError(false);
            setCountCorrectAnswers(countCorrectAnswers += 1)
            changeRiddleToShow()
            setAnswer("")
        } else if (answer != "") {
            setHelperText('Sorry, wrong answer!');
            setError(true);
            changeRiddleToShow()
            setAnswer("")
        } else {
            setHelperText('Please select an option.');
            setError(true);
        }
    };
    function ShowRiddleQuestion(sortedRiddles: RiddleInterface[]) {
        return (
            <Box >
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 3 }} error={error} variant="standard">
                        <FormLabel id="demo-error-radios">Riddle quiz:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-error-radios"
                            name="quiz"
                            value={answer}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value={sortedRiddles[0].answer} control={<Radio />} label={sortedRiddles[0].answer} />
                            <FormControlLabel value={sortedRiddles[1].answer} control={<Radio />} label={sortedRiddles[1].answer} />
                            <FormControlLabel value={sortedRiddles[2].answer} control={<Radio />} label={sortedRiddles[2].answer} />
                            <FormControlLabel value={sortedRiddles[3].answer} control={<Radio />} label={sortedRiddles[3].answer} />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                            Check Answer
                        </Button>
                    </FormControl>
                </form>
            </Box>
        )
    }

    // 5 - Controller of the game
    const [sortedRiddles, setSortedRiddles] = useState<RiddleInterface[]>([])
    const [riddleToShow, setRiddleToShow] = useState<RiddleInterface>(easyRiddles[0])

    useEffect(() => {
        // Filter the riddles
        console.log(easyRiddles)
        let otherRiddles2 = easyRiddles.filter(riddle => !riddle.alredyShowRiddle)
        otherRiddles2.filter(riddle => riddle.riddle != riddleToShow.riddle)

        otherRiddles2.sort(randomSort)

        let otherRiddles: RiddleInterface[] = [otherRiddles2[0], otherRiddles2[1], otherRiddles2[2]]

        setSortedRiddles([...otherRiddles, riddleToShow].sort(randomSort))

        function randomSort(a: any, b: any) {
            return 0.5 - Math.random()
        }

    }, [riddleToShow])

    useEffect(() => {
        // console.log(sortedRiddles)
    }, [sortedRiddles])

    const ControllerOfTheGame = () => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow={1} sx={{ p: 4, maxWidth: 900, backgroundColor: "#D7FFFF" }}>
                <Typography variant="h5" textAlign="center">
                    {riddleToShow?.riddle}
                </Typography>
                <Box>
                    {sortedRiddles.length > 0 ? ShowRiddleQuestion(sortedRiddles)
                        : <></>
                    }
                </Box>
            </Box>
        )
    }

    return <>
        <ControllerOfTheGame />
    </>
}