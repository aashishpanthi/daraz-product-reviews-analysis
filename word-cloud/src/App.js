import "./App.css";
import WordCloudChart from "./WordCloud";
import reviews from "./reviews.json";

function App() {
  return (
    <div className="App">
      <WordCloudChart reviews={reviews} />
    </div>
  );
}

export default App;
