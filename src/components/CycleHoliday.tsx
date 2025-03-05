import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday = "🎄" | "🎃" | "💌" | "🦃" | "🥮";

const HOLIDAYS_CHRONOLOGICAL: Holiday[] = ["🎄", "💌", "🥮", "🎃", "🦃"];
const HOLIDAYS_ALPHABETICAL: Holiday[] = ["🎄", "🎃", "🥮", "🦃", "💌"];

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎄");

    function getNextHoliday(order: Holiday[]) {
        const i = order.indexOf(holiday);
        const next = (i + 1) % order.length;
        setHoliday(order[next]);
    }

    return (
        <div>
            <h3>Current Holiday: {holiday}</h3>
            <Button
                onClick={() => {
                    getNextHoliday(HOLIDAYS_CHRONOLOGICAL);
                }}
            >
                Next by Year
            </Button>
            <Button
                onClick={() => {
                    getNextHoliday(HOLIDAYS_ALPHABETICAL);
                }}
            >
                Next by Alphabet
            </Button>
        </div>
    );
}
