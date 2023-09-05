import getBasicDetails from "./getBasicDetails.js";
import getBrandName from "./getBrandName.js";
import getSellerDetails from "./getSellerDetails.js";
import getRatings from "./getRatings.js";
import getReviews from "./getReviews.js";
import saveData from "./saveData.js";

const getData = async (url, page) => {
  // navinagte to each product's page
  //then get the product's
  // 1. name
  // 2. price
  // 3. reviews
  // 4. ratings
  // 5. image url
  // 6. product url
  // 7. brand name
  // 8. category name
  //and save it in a csv file

  await page.goto(url, { waitUntil: "networkidle2" });

  // name, price, image
  const { name, image, price } = await getBasicDetails(page);

  // brand name
  const brandName = await getBrandName(page);

  // get seller details
  const seller = await getSellerDetails(page);

  // get reviews
  const reviews = await getReviews(page);

  // get ratings
  const { ratings, totalRatings } = await getRatings(page);

  const data = {
    name,
    url,
    price,
    image,
    brand: brandName,
    seller,
    ratings,
    totalRatings,
    reviews,
  };

  console.log(data);

  // save data in csv file
  await saveData(data);
};

export default getData;
