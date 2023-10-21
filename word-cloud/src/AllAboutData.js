import React from "react";
import data from "./reviews.json";

function AllAboutData() {
  const totalProducts = data?.length;
  const totalReviews = data?.reduce((acc, curr) => {
    const reviews =
      curr.reviews.length === 0
        ? 0
        : curr.reviews[0] === ""
        ? 0
        : curr.reviews.length;
    return acc + reviews;
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
    const reviews =
      curr.reviews.length === 0
        ? 0
        : curr.reviews[0] === ""
        ? 0
        : curr.reviews.length;
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
              <th>No. of Reviewed Products</th>
              <th>No. of Non reviewed Products</th>
              <th>No. of Reviews</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(categories).map((category) => {
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{categories[category]}</td>
                  <td>
                    {
                      data.filter(
                        (product) =>
                          product.category === category &&
                          product.reviews.length > 0 &&
                          product.reviews[0] !== ""
                      ).length
                    }
                  </td>
                  <td>
                    {
                      data.filter(
                        (product) =>
                          product.category === category &&
                          (product.reviews.length === 0 ||
                            product.reviews[0] === "")
                      ).length
                    }
                  </td>
                  <td>{categoryReviews[category]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>What is the overall sentiment of the reviews?</h2>
        <p>
          The overall sentiment of the reviews is positive. The sentiment of the
          reviews was analyzed using{" "}
          <a
            href="https://www.npmjs.com/package/sentiment"
            title="Sentiment, a node library"
          >
            sentiment
          </a>{" "}
          node library. The sentiment of each review was analyzed and the
          average sentiment of all the reviews was calculated. The average
          sentiment was used to determine the overall sentiment of the reviews.
          <ul>
            <li>
              <strong>Positive</strong>: The average sentiment is greater than
              0.
            </li>
            <li>
              <strong>Neutral</strong>: The average sentiment is 0.
            </li>
            <li>
              <strong>Negative</strong>: The average sentiment is less than 0.
            </li>
          </ul>
        </p>

        <h2>How many products didn't have any review?</h2>
        <p>
          A total of{" "}
          {data
            .filter(
              (product) =>
                product.reviews.length === 0 || product.reviews[0] === ""
            )
            .length.toLocaleString()}{" "}
          out of {data.length.toLocaleString()} products didn't have any review.
          Meaning that{" "}
          {(
            (data.filter(
              (product) =>
                product.reviews.length === 0 || product.reviews[0] === ""
            ).length /
              data.length) *
            100
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          % of the products didn't have any review.
        </p>

        <h2>Limitations</h2>
        <p>
          <ol>
            <li>
              The data was scraped on September, 2023. The data might not be
              accurate for the current date.
            </li>
            <li>
              The sentiment of the products with zero ratings or reviews
              couldn't be analyzed.
            </li>
            <li>
              Only {data.length.toLocaleString()} products were scraped. The
              data might not be accurate for generalization.
            </li>
          </ol>
        </p>
      </div>
    </div>
  );
}

export default AllAboutData;
