import puppeteer from "puppeteer";
import getBasicDetails from "./getBasicDetails.js";
import getBrandName from "./getBrandName.js";

const fun = async () => {
  // 1. Create a new browser instance
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 2. Create a new page instance
  const page = await browser.newPage();

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

  const url =
    "https://www.daraz.com.np/products/dell-vostro-3400-i3-11th-gen-8gb-ram-256gb-ssd-14-inch-display-laptop-i118372728-s1032434216.html";

  await page.goto(url, { waitUntil: "networkidle2" });

  // name, price, image
  const data = await getBasicDetails(page);

  // brand name
  const brandName = await getBrandName(page);
  data.brandName = brandName;

  console.log(data);
  // 4. Close the browser
  await browser.close();
};

fun();
