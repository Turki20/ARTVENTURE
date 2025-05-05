import { Link } from "react-router";

function Header() {
    const menuButton = document.querySelector(".i");
    console.log(menuButton);
    const menu = document.querySelector("ul");
    let isMenuOpen = false;
     function menue() {
        if (!isMenuOpen) {
            menu.style.right = "0vh";
            isMenuOpen = true;
        }
        else {
            menu.style.right = "-30vh";
            isMenuOpen = false;
        }
    }
    return (
        <header className="header">
            <h1>ARTVENTURE</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-menu-button-wide i" viewBox="0 0 16 16" onClick={menue}>
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
            </svg>
            <ul>
                <li>
                    <a href="/">LOGIN</a>
                </li>
                <li>
                    <a href="/about">SIGN UP</a>
                    
                </li>
            </ul>
        </header>
    );
}

export default Header;