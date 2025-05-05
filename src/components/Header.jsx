import { useNavigate } from "react-router";
import { auth } from "../pages/firebase";
import { signOut } from "firebase/auth";
import { useState, useRef } from "react";

function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            menuRef.current.style.right = "0vh";
            setIsMenuOpen(true);
        } else {
            menuRef.current.style.right = "-30vh";
            setIsMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // إعادة التوجيه للصفحة الرئيسية بعد تسجيل الخروج
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <header className="header">
            <h1>ARTVENTURE</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-menu-button-wide i"
                viewBox="0 0 16 16"
                onClick={toggleMenu}
            >
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5z" />
                <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323..." />
            </svg>
            <ul ref={menuRef} style={{ right: "-30vh", transition: "right 0.3s" }}>
                <li>
                    <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                        Logout
                    </button>
                </li>
            </ul>
        </header>
    );
}

export default Header;
