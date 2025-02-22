import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WorkSpace from "./pages/WorkSpace";
import Header from "./components/common/Header";
import Subscription from "./pages/Subscription";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace/:workId" element={<WorkSpace />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </div>
  );
}

export default App;
