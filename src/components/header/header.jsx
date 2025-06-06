import "./header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
export default function Header() {
  return (
    <>
      <header className="header">
        <figure>
          <img src={logo} alt="Logo MCTI Futuro" className="rounded " />
          <figcaption>
            Projeto <span className="digitando">Full Stack Intermediário</span>
          </figcaption>
        </figure>
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
              {console.log("Cllicado no home page")}
            </li>

            <li>
              <Link to="/contacts">Contatos</Link>
              {console.log("Cllicado no contatos")}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
