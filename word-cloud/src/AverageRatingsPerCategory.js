import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from "./reviews.json";

const AverageRatingByCategory = ({}) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      // Calculate average ratings by category
      const categories = {};
      data.forEach((product) => {
        const category = product.category;
        const rating = parseFloat(product.ratings);
        if (!isNaN(rating)) {
          if (category in categories) {
            categories[category].totalRating += rating;
            categories[category].count += 1;
          } else {
            categories[category] = {
              totalRating: rating,
              count: 1,
            };
          }
        }
      });

      const categoryLabels = Object.keys(categories);
      const averageRatings = categoryLabels.map(
        (category) =>
          categories[category].totalRating / categories[category].count
      );

      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: "Average Rating",
              data: averageRatings,
              backgroundColor: "royalblue",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 5,
              title: {
                display: true,
                text: "Average Rating",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2>Average Rating per Product Category</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default AverageRatingByCategory;
