import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import data from "./reviews.json";

const ScatterPlot = ({}) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
      const ratings = data.map((product) => parseFloat(product.ratings));
      const sentimentScores = data.map((product) =>
        parseFloat(product.averageScore)
      );

      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "(Raings, Sentiment Score)",
              data: data.map((product, index) => ({
                x: ratings[index],
                y: sentimentScores[index],
                text: product.name,
              })),
              pointStyle: "circle",
              pointRadius: 3,
              backgroundColor: "orange",
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Rating",
              },
            },
            y: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Sentiment Score",
              },
            },
          },
          tooltips: {
            callbacks: {
              label: function (context) {
                const product = data[context.dataIndex];
                return product.name;
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
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2>Scatter Plot: Rating vs Sentiment Score</h2>
      <canvas ref={chartRef} width="400" height="300"></canvas>
    </div>
  );
};

export default ScatterPlot;
