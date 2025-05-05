import { useState, useEffect } from "react";

import art1 from '../assets/images/1.jpg';
import art2 from '../assets/images/2.jpg';
import art3 from '../assets/images/3.jpg';
import art4 from '../assets/images/4.jpg';
import art5 from '../assets/images/5.jpg';
import art6 from '../assets/images/6.jpg';
import art7 from '../assets/images/7.jpg';



const HeroSection = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const images = document.querySelectorAll(".hero-section img");

            images.forEach((img) => {
                img.style.opacity = Math.max(1 - scrollY / 1000, 0);
                img.style.transform = `translateY(-${scrollY / 5}px)`;
            });

            const texts = document.querySelectorAll(".hero-text");
            texts.forEach((text) => {
                text.style.opacity = Math.max(1 - scrollY / 800, 0);
                text.style.transform = `translateY(-${scrollY / 8}px)`;
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="hero-section">
            <h1 className="hero-text">ARTVENTURE</h1>
            <p className="hero-text">Discover the beauty of art from around the world.</p>
            <img id="m1" src={art1} alt="none" />
            <img id="m2" src={art2} alt="none" />
            <img id="m3" src={art3} alt="none" />
            <img id="m4" src={art4} alt="none" />
            <img id="m5" src={art5} alt="none" />
            <img id="m6" src={art6} alt="none" />
            <img id="m7" src={art7} alt="none" />
        </div>
    );
}

export default HeroSection;