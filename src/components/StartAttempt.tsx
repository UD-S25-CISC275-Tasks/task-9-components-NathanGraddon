import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [progress, setProgress] = useState<boolean>(false);

    const startQuiz = () => {
        setAttempts((prev) => prev - 1);
        setProgress(true);
    };

    const stopQuiz = () => {
        setProgress(false);
    };
    const addAttempt = () => {
        setAttempts((prev) => prev + 1);
    };
    return (
        <div>
            <h3>Attempts: {attempts}</h3>
            <Button onClick={startQuiz} disabled={progress || attempts === 0}>
                Start Quiz
            </Button>
            <Button onClick={addAttempt} disabled={progress}>
                Mulligan
            </Button>
            <Button onClick={stopQuiz} disabled={!progress}>
                Stop Quiz
            </Button>
        </div>
    );
}
