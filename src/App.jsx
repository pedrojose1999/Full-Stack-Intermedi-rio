import Header from "./components/header/header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
