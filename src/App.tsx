import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LocationDataPage from "./pages/LocationDataPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/:locationData" element={<LocationDataPage />} />
    </Routes>
  );
}
export default App;
