import "./CardPokemon.css";
import fundoFogo from "../assets/img/fundo-fogo.jpg";
import fundoEletrico from "../assets/img/fundo-raio.jpg";
import fundoPisiquico from "../assets/img/fundo-psiquico.jpg";
import fundoDefault from "../assets/img/fundo-padrao.jpg";
export default function CardComponent({ name, hp, description, type, image }) {
  let backgroundUrl = "";

  switch (type) {
    case "fogo":
      backgroundUrl = fundoFogo;
      break;
    // case "agua":
    //   backgroundUrl = "url('../assets/img/fundo-agua.jpg')";
    //   break;
    // case "planta":
    //   backgroundUrl = "url('../assets/img/fundo-planta.jpg')";
    //   break;
    case "eletrico":
      backgroundUrl = fundoEletrico;
      break;
    case "psiquico":
      backgroundUrl = fundoPisiquico;
      break;
    default:
      backgroundUrl = fundoDefault;
      break;
  }

  return (
    <>
      <div className="card-pokemon">
        <div
          className="card"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: "cover", // opcional
            backgroundPosition: "center", // opcional
          }}
        >
          <div className="info">
            <h2 className="name">{name}</h2>
            <p className="life">HP {hp}</p>
          </div>

          <div className="container-image">
            <img src={image} alt={name} className="image-pokemon" />
          </div>

          <div className="description">
            <h3 className="title">Descrição</h3>
            <p className="text">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
