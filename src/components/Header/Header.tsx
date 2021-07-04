import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <nav className="header">
      <Link to="/">Dev Quizzer</Link>
    </nav>
  );
}
