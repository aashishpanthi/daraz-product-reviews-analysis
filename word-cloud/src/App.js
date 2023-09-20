import "./App.css";
import WordCloudChart from "./WordCloud";
import reviews from "./reviews.json";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<WordCloudChart reviews={reviews} word="all" />}
        />
        <Route
          path="/positive"
          element={<WordCloudChart reviews={reviews} word="positive" />}
        />
        <Route
          path="/negative"
          element={<WordCloudChart reviews={reviews} word="negative" />}
        />
      </Routes>
    </div>
  );
}

export default App;
