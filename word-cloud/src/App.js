import "./App.css";
import Ratings from "./Ratings";
import RatingsAccCategory from "./RatingsAccCategory";
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

        <Route path="/ratings" Component={Ratings} />

        <Route path="/ratings-acc-category" Component={RatingsAccCategory} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
