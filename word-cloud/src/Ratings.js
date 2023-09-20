import React from "react";
import Chart from "chart.js/auto";
import reviews from "./reviews.json";
import { useRef } from "react";

function Ratings() {
  const ref = useRef(null);

  const loadChart = () => {
    // loop over each review and get the ratings of each review

    const ratings = reviews.map((review) => {
      return review.ratings || 0;
    });

    console.log(ratings);

    // calculate the number of ratings in each range i.e. 1-2, 2-3, 3-4, 4-5
    const ratingsCount = ratings.reduce(
      (acc, rating) => {
        if (rating >= 1 && rating < 2) {
          acc[0]++;
        } else if (rating >= 2 && rating < 3) {
          acc[1]++;
        } else if (rating >= 3 && rating < 4) {
          acc[2]++;
        } else if (rating >= 4 && rating < 5) {
          acc[3]++;
        } else if (rating === 5) {
          acc[4]++;
        }
        return acc;
      },
      [0, 0, 0, 0, 0]
    );

    // get the total number of ratings
    const totalRatings = ratingsCount.reduce((acc, rating) => acc + rating, 0);

    // calculate the percentage of each rating
    const ratingsPercentage = ratingsCount.map((rating) =>
      ((rating / totalRatings) * 100).toFixed(2)
    );

    console.log(ratingsPercentage);

    // create the pie chart
    const ctx = ref.current.getContext("2d");
    const ratingsChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["1-2", "2-3", "3-4", "4-5", "5"],
        datasets: [
          {
            label: "Ratings (%)",
            data: ratingsPercentage,
            backgroundColor: ["red", "orange", "yellow", "green", "blue"],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
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
            text: "Ratings pie chart",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  React.useEffect(() => {
    loadChart();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Ratings</h1>
      <p style={{ textAlign: "center" }}>
        Overall ratings of the products on Daraz
      </p>

      <div
        style={{
          height: 600,
          width: 800,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 5,
          marginLeft: "auto",
          marginRight: "auto",
          border: "1px solid #ccc",
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas ref={ref} />
      </div>
    </>
  );
}

export default Ratings;
