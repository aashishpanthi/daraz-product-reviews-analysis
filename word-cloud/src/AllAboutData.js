import React from "react";
import data from "./reviews.json";

function AllAboutData() {
  const totalProducts = data?.length;
  const totalReviews = data?.reduce((acc, curr) => {
    return acc + curr.reviews.length;
  }, 0);
  const averageReviews = totalReviews / totalProducts;

  // get all the categories from the data

  // get the total number of products in each category
  const categories = data?.reduce((acc, curr) => {
    const category = curr.category;
    if (acc[category]) {
      acc[category] += 1;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  // get the total number of reviews in each category
  const categoryReviews = data?.reduce((acc, curr) => {
    const category = curr.category;
    const reviews = curr.reviews.length;
    if (acc[category]) {
      acc[category] += reviews;
    } else {
      acc[category] = reviews;
    }
    return acc;
  }, {});

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto ",
      }}
    >
      <h1 style={{ textAlign: "center" }}>All About Data</h1>
      <p>
        The data used in this project was scraped from{" "}
        <a href="daraz.com.np/" title="Daraz Nepal">
          Daraz
        </a>{" "}
        website using puppeteer. The data was scraped on September, 2023.
      </p>
      <div
        style={{
          textAlign: "left",
          marginTop: "30px",
        }}
      >
        <h2>How the data was scraped?</h2>
        <p>
          The data was scraped using{" "}
          <a href="https://pptr.dev/" title="Puppeteer, a node library">
            puppeteer
          </a>
          . First, the bot opens up a random product page. Then, it scrolls down
          to the bottom of the page to load all the reviews. After that, it
          extracts the reviews and stores them in a JSON file. The bot repeats
          then picks up another random product from the recommendations sections
          and repeats the process.
        </p>

        <h2> How many reviews were scraped?</h2>
        <p>
          A total of {totalReviews.toLocaleString()} reviews were scraped. The
          reviews were scraped from {totalProducts.toLocaleString()} different
          products. Each product had an average of{" "}
          {averageReviews.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          reviews.
        </p>

        <h2>How the data is visualized?</h2>
        <p>
          The data is visualized using{" "}
          <a href="https://react.dev/" title="React, a javascript framework">
            React
          </a>{" "}
          and{" "}
          <a
            href="https://www.chartjs.org/"
            title="Chartjs, a javascript framework"
          >
            ChartJs{" "}
          </a>
          . The data is stored in a JSON file. The JSON file is imported in the
          React app. The data is then visualized using ChartJs.
        </p>

        {/* make a table with the categories name in one column and the number of products in another column. Also, add no. of ratings in rach category and the overall sentiment */}
        <h2>What are the categories of the products?</h2>
        <p>
          There are a total of {Object.keys(categories).length} categories of
          products. The categories are listed below.
        </p>

        <table
          style={{
            width: "100%",

            border: "1px solid black",

            borderCollapse: "collapse",
          }}
          cellPadding={10}
          cellSpacing={3}
        >
          <thead>
            <tr>
              <th>Category</th>
              <th>No. of Products</th>
              <th>No. of Reviews</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(categories).map((category) => {
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{categories[category]}</td>
                  <td>{categoryReviews[category]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAboutData;
