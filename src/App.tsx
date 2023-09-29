import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LocationDataPage from "./pages/LocationDataPage";
import SearchPage from "./pages/SerachPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/:locationData" element={<LocationDataPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
export default App;
