import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BrainScene from "../main.jsx";
import { gsap } from "gsap";

export default function Home() {
    useEffect(() => {
        const nav = document.querySelector('nav');
        const title = document.querySelector('.title');
        const tl = gsap.timeline({ defaults: { duration: 1 } });
        if (nav) tl.fromTo(nav, { y: '-100%' }, { y: '0%' });
        if (title) tl.fromTo(title, { opacity: 0 }, { opacity: 1 }, "<");
    }, []);
    return (
        <div>
            <Navbar />
            <BrainScene />
            <h1 className="title">Neurotechnology@Berkeley</h1>
            <div className="Section">
                <h1><a href="/operations">Operations</a></h1>
                <p className="text">Our operations division. . .</p>
            </div>
            <div className="Section">
                <h1><a href="/education">Education</a></h1>
                <p className="text">Our Education division. . .</p>
            </div>
            <div className="Section">
                <h1><a href="/publications">Publications</a></h1>
                <p className="text">Our Publications division. . .</p>
            </div>
            <div className="Section">
                <h1><a href="/devices">Devices</a></h1>
                <p className="text">Our Devices division. . .</p>
            </div>
            <div className="Section">
                <h1><a href="/software">Software</a></h1>
                <p className="text">Our Software division. . .</p>
            </div>
            <div className="Section">
                <h1><a href="/wetware">Wetware</a></h1>
                <p className="text">Our Wetware division. . .</p>
            </div>
        </div>
    )
}