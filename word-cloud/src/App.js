import "./App.css";
import Home from "./Home";
import Ratings from "./Ratings";
import RatingsAccCategory from "./RatingsAccCategory";
import WordCloudChart from "./WordCloud";
import OverallSentiment from "./OverallSentiment";
import BarSentiAccCategories from "./BarSentiAccCategories";
import AllAboutData from "./AllAboutData";
import AverageRatingsPerCategory from "./AverageRatingsPerCategory";
import reviews from "./reviews.json";
import { Link, Route, Routes } from "react-router-dom";
import ScatterPlot from "./ScatterPlot";
import ShowTheData from "./ShowTheData";

function App() {
  return (
    <div className="App">
      {/* Add a home button */}
      <Link to="/" style={{ position: "absolute", top: "20px", left: "25px" }}>
        Home
      </Link>
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
          path="/sentiment-across-categories"
          Component={BarSentiAccCategories}
        />

        <Route path="/sentiment-vs-ratings" Component={ScatterPlot} />

        <Route
          path="/average-ratings-by-category"
          Component={AverageRatingsPerCategory}
        />

        <Route path="/all-about-data" Component={AllAboutData} />

        <Route path="/show-the-data" Component={ShowTheData} />

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
