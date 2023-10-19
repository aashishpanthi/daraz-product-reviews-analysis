import React from "react";
import { Link } from "react-router-dom";

function Home() {
  // add links to all the pages
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "5px" }}>
        Daraz reviews analysis
      </h1>
      <p style={{ textAlign: "center", marginBottom: "50px" }}>
        This page contains links to all the pages of the project
      </p>
      <h3 style={{ textAlign: "center", marginBottom: 0 }}>
        Sentiment analysis
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/overall-sentiment" style={{ margin: 10 }}>
          Overall Sentiment Analysis
        </Link>
        <Link to="/sentiment-across-categories" style={{ margin: 10 }}>
          Sentiment Analysis Across Categories
        </Link>
      </div>
      <h3 style={{ textAlign: "center", marginBottom: 0 }}>Word cloud</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/word-cloud" style={{ margin: 10 }}>
          Word Cloud
        </Link>
        <Link to="/word-cloud/positive" style={{ margin: 10 }}>
          Word Cloud (Positive)
        </Link>
        <Link to="/word-cloud/negative" style={{ margin: 10 }}>
          Word Cloud (Negative)
        </Link>
      </div>
      <h3 style={{ textAlign: "center", marginBottom: 0 }}>Ratings</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/ratings" style={{ margin: 10 }}>
          Ratings
        </Link>
        <Link to="/ratings-acc-category" style={{ margin: 10 }}>
          Ratings by Category
        </Link>
      </div>
    </div>
  );
}

export default Home;
