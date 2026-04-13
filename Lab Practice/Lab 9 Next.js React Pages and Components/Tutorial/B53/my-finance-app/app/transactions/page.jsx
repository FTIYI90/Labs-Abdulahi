// rfce
'use client'
import React, { useEffect, useState } from 'react'

function Transactions() {

    const [counter, setCounter] = useState(0);

    function incrementCounter() {
        setCounter(counter + 1);
        console.log("Incrementing Counter", counter);
    }

    useEffect(() => {
        console.log("counter updated")
    }, [counter])

    return (
        <div>
            <button className={"btn"} onClick={(e) => incrementCounter()}>Increment</button>
            <h1>Transactions Page Is Loaded {counter}</h1>
        </div>
    )
}

export default Transactions