import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from "./reviews.json";

const SentimentDistributionChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const categories = {};
      data.forEach((product) => {
        const category = product.category;
        if (!categories[category]) {
          categories[category] = { positive: 0, neutral: 0, negative: 0 };
        }

        const sentiment = determineSentiment(product.averageScore);

        categories[category][sentiment]++;
      });

      const categoryNames = Object.keys(categories);
      const positiveCounts = categoryNames.map(
        (category) => categories[category].positive
      );
      const neutralCounts = categoryNames.map(
        (category) => categories[category].neutral
      );
      const negativeCounts = categoryNames.map(
        (category) => categories[category].negative
      );

      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: categoryNames,
          datasets: [
            {
              label: "Positive Sentiments",
              data: positiveCounts,
              backgroundColor: "green",
            },
            {
              label: "Neutral Sentiments",
              data: neutralCounts,
              backgroundColor: "blue",
            },
            {
              label: "Negative Sentiments",
              data: negativeCounts,
              backgroundColor: "red",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  const determineSentiment = (averageScore) => {
    if (averageScore > 0) {
      return "positive";
    } else if (averageScore === 0) {
      return "neutral";
    } else {
      return "negative";
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <h2>Sentiment Distribution by Category</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SentimentDistributionChart;
