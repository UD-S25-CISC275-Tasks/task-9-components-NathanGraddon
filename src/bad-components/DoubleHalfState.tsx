import { useState } from "react";

export function useDoubleHalfState() {
    return useState<number>(10);
}
