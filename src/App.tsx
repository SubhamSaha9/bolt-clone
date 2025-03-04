import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WorkSpace from "./pages/WorkSpace";
import Header from "./components/common/Header";
import Subscription from "./pages/Subscription";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/workspace/:workId"
          element={
            <PrivateRoute>
              <WorkSpace />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <PrivateRoute>
              <Subscription />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
