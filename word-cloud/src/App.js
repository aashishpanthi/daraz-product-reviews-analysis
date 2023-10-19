import "./App.css";
import Home from "./Home";
import Ratings from "./Ratings";
import RatingsAccCategory from "./RatingsAccCategory";
import WordCloudChart from "./WordCloud";
import OverallSentiment from "./OverallSentiment";
import reviews from "./reviews.json";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/word-cloud"
          element={<WordCloudChart reviews={reviews} word="all" />}
        />
        <Route
          path="/word-cloud/positive"
          element={<WordCloudChart reviews={reviews} word="positive" />}
        />
        <Route
          path="/word-cloud/negative"
          element={<WordCloudChart reviews={reviews} word="negative" />}
        />

        <Route path="/ratings" Component={Ratings} />

        <Route path="/ratings-acc-category" Component={RatingsAccCategory} />

        <Route path="/overall-sentiment" Component={OverallSentiment} />

        <Route
          path="*"
          element={
            <div>
              <h1>404</h1>
              <p>Page not found</p>

              <p>
                <Link to="/">Go back to home</Link>
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
