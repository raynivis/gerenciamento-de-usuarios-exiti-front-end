import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Home from "./page/home";

function App() {
     return (
          <div className="h-screen flex flex-col bg-gray-100">
               <Header />
               <Home />
               <ToastContainer />
          </div>
     );
}

export default App;
