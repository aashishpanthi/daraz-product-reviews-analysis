import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import reviews from "./reviews.json";

function OverallSentiment() {
  const chartRefs = useRef({}); // Use an object to store chart refs by category

  useEffect(() => {
    // Create a chart that shows the overall sentiment of all the reviews i.e. positive, negative, and neutral using a pie chart
    // use averageScore to get the overall sentiment
    // negative sentiment is less than 0
    // positive sentiment is greater than 0
    // neutral sentiment is equal to 0

    const ratings = reviews.map((review) => {
      if (review.averageScore < 0) {
        return "Negative";
      }
      if (review.averageScore > 0) {
        return "Positive";
      }
      return "Neutral";
    });

    const ratingsPercentage = [
      (ratings.filter((rating) => rating === "Positive").length /
        ratings.length) *
        100,
      (ratings.filter((rating) => rating === "Negative").length /
        ratings.length) *
        100,
      (ratings.filter((rating) => rating === "Neutral").length /
        ratings.length) *
        100,
    ];

    // Get the context of the canvas element we want to select
    const ctx = chartRefs.current.getContext("2d");

    // Create the pie chart
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
          {
            label: ``,
            data: ratingsPercentage,
            backgroundColor: ["green", "red", "blue"],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(54, 162, 235)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Overall Sentiment of all the reviews`,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sentiment analysis</h1>
      <p style={{ textAlign: "center" }}>
        Overall sentiment of all the reviews
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <canvas
            ref={(ref) => {
              chartRefs.current = ref;
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OverallSentiment;
