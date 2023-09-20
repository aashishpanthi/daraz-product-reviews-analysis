import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import reviews from "./reviews.json";

function RatingsAccCategory() {
  const chartRefs = useRef({}); // Use an object to store chart refs by category

  useEffect(() => {
    // Create a separate chart for each unique category
    const uniqueCategories = [
      ...new Set(reviews.map((review) => review.category)),
    ];

    console.log(uniqueCategories);

    uniqueCategories.forEach((category) => {
      const canvasRef = chartRefs.current[category];
      const categoryReviews = reviews.filter(
        (review) => review.category === category
      );

      if (canvasRef && categoryReviews.length > 0) {
        createPieChart(canvasRef, categoryReviews, category);
      }
    });
  }, []);

  const createPieChart = (canvasRef, data, category) => {
    const ctx = canvasRef.getContext("2d");

    // Extract ratings data for the category
    const ratings = data.map((review) => review.ratings || 0);

    // Calculate ratings count for each range
    const ratingsCount = [0, 0, 0, 0, 0];
    ratings.forEach((rating) => {
      if (rating >= 1 && rating < 2) {
        ratingsCount[0]++;
      } else if (rating >= 2 && rating < 3) {
        ratingsCount[1]++;
      } else if (rating >= 3 && rating < 4) {
        ratingsCount[2]++;
      } else if (rating >= 4 && rating < 5) {
        ratingsCount[3]++;
      } else if (rating === 5) {
        ratingsCount[4]++;
      }
    });

    console.log(ratingsCount);

    // Calculate the percentage of each rating
    const totalRatings = ratingsCount.reduce((acc, rating) => acc + rating, 0);
    const ratingsPercentage = ratingsCount.map((rating) =>
      ((rating / totalRatings) * 100).toFixed(2)
    );

    // Create the pie chart
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["1-2", "2-3", "3-4", "4-5", "5"],
        datasets: [
          {
            label: `Ratings for ${category}`,
            data: ratingsPercentage,
            backgroundColor: ["red", "orange", "yellow", "green", "blue"],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
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
            text: `Ratings for ${category}`,
          },
        },
      },
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Ratings</h1>
      <p style={{ textAlign: "center" }}>
        Ratings of the products on Daraz by category
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {reviews &&
          reviews.length > 0 &&
          [...new Set(reviews.map((review) => review.category))].map(
            (category) => (
              <div
                key={category}
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
                    chartRefs.current[category] = ref;
                  }}
                />
              </div>
            )
          )}
      </div>
    </>
  );
}

export default RatingsAccCategory;
