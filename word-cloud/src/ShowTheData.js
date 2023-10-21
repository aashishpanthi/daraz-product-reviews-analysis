import React from "react";
import "./ProductList.css"; // Import the CSS file for styling

import productsData from "./reviews.json";

// Function to shuffle the products randomly
const shuffleProducts = (products) => {
  let shuffledProducts = [...products];
  for (let i = shuffledProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProducts[i], shuffledProducts[j]] = [
      shuffledProducts[j],
      shuffledProducts[i],
    ];
  }
  return shuffledProducts;
};

function ProductList() {
  const products = shuffleProducts(productsData);

  console.log(products);
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <div className="product-top">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <p className="product-category">{product.category}</p>
              <a
                className="product-link"
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Daraz
              </a>
            </div>
          </div>
          {product?.reviews ? (
            product.reviews.length == 0 || product.reviews[0] === "" ? (
              <strong>No reviews</strong>
            ) : (
              product.reviews.length > 0 && (
                <div className="product-reviews">
                  <h3>Reviews:</h3>
                  <ul>
                    {product.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                </div>
              )
            )
          ) : (
            <strong>No reviews</strong>
          )}
        </div>
      ))}
    </div>
  );
}

const App = () => {
  return (
    <div className="app">
      <h1>See all the products we scraped</h1>
      <ProductList />
    </div>
  );
};

export default App;
