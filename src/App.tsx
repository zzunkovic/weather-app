import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LocationDataPage from "./pages/LocationDataPage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/:locationData" element={<LocationDataPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/error"
        element={<ErrorPage message="Something went wrong" />}
      ></Route>
      <Route path="*" element={<ErrorPage message="Invalid Url" />}></Route>
    </Routes>
  );
}
export default App;
