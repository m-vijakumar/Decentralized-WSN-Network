import React, { useEffect, useState } from 'react'

export default function Home() {

    const [isSpinner, setSpinner] = useState(true);

    useEffect(() => {

        // await fetch('/auth'

        // ).then(res =>{console.log(res)})
        setSpinner(false)
    }, []);

    if (isSpinner) {
        return (
            <div className="spinner-border" role="status" id="spinner">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else {

        return (
            <div className="App" style={{ background: "https://www.ledgerinsights.com/wp-content/uploads/2020/09/blockchain-network.2.jpg" }}>
                <br /> <br />
                <h1>Welcome </h1>

                <p > <a href="/login">  Login</a></p>
            </div>
        )
    }

}