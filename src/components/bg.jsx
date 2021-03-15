import React, {useState, useEffect} from 'react';
import { tsParticles } from "tsparticles";
import options from "../components/home/particles";


export default function Bg() {
    const [particles, setParticles] = useState(false);

    useEffect(() => {
        tsParticles.loadFromArray("tsparticles", [
            options,
        ]);

        return ()=>{
            setParticles(false)
        }
    }, []);
    return(
        <div className='particlesBg'>

            {
                particles&&   <div id="tsparticles" />

            }
        </div>
    )
}
