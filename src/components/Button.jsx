import { Link } from "react-router";

function Button({ label , route}) {
  return (
    <button >{<Link to={route} style={{
        textDecoration: "none",
      }}>{label}</Link>}</button>

  );
}

export default Button;