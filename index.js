import puppeteer from "puppeteer";
import getData from "./getData.js";

const fun = async () => {
  // 1. Create a new browser instance
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 2. Create a new page instance
  const page = await browser.newPage();

  const url =
    "https://www.daraz.com.np/products/lenovo-v15-celeron-4gb-ram-256gb-ssd156-inch-fhd-display-i117911554-s1032329631.html";

  await getData(url, page);

  // 4. Close the browser
  await browser.close();
};

fun();
