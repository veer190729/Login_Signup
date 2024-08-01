import React, { useState } from "react";
import bulbOnImage from '../../images/OFFbulb.jpg';
import bulbOffImage from '../../images/ONbulb.jpg';

function BulbApp() {
    const [isOn, setIsOn] = useState(false);

    const toggleBulb = () => {
        setIsOn(!isOn);
    };

    return (
        <div>
            <img src={isOn ? bulbOnImage : bulbOffImage} alt="Bulb" style={{ width: "100px", height: "100px", margin: "20px" }} />
            <button onClick={toggleBulb}>{isOn ? "Turn Off" : "Turn On"} Bulb</button>
        </div>
    );
}

export default BulbApp;