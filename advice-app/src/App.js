//Imports
import './App.css'
import { useEffect, useState } from "react";
const API_URL = 'https://api.adviceslip.com/advice'
const App = () => {

    const [advice, setAdivce] = useState();

    const getAdvice = async() => {
        const response = await fetch(`${API_URL}`)
        const data = await response.json();
        console.log(data.slip.advice);
        setAdivce(data.slip.advice);
    }

    useEffect(() => {
        getAdvice()
    }, []);

    return(
        <div className="container">
            <div className="adviceBox">
                <p className="adviceText">{advice}</p>
                <button className='adviceBTN'
                onClick={() => {getAdvice();}} >Click for new Advice</button>
            </div>
        </div>
    )
}

export default App;