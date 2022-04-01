
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import CustomLayout from "./components/Layer";
import BaseRouter from './routes';
function App() {
  return (
     <Router>
        <CustomLayout>
             <BaseRouter/>
        </CustomLayout>
     </Router>
  );
}

export default App;
