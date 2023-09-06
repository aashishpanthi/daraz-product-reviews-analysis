import puppeteer from "puppeteer";
import getData from "./getData.js";
import data from "./data.json" assert { type: "json" };

const fun = async () => {
  // 1. Create a new browser instance
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  // 2. Create a new page instance
  const page = await browser.newPage();

  let url =
    "https://www.daraz.com.np/products/lenovo-v15-celeron-4gb-ram-256gb-ssd156-inch-fhd-display-i117911554-s1032329631.html";

  const scrapedURLs = new Set(data?.map((item) => item.url));

  // ".recommend-product-item .product-item-link"

  do {
    await getData(url, page);

    const nextProductUrls = await page.evaluate(() => {
      const links = document.querySelectorAll(
        ".recommend-product-item .product-item-link"
      );
      return Array.from(links).map((link) => link.href.split("?")[0]);
    });

    console.log(nextProductUrls);

    if (nextProductUrls.length > 0) {
      nextProductUrls.forEach((link) => {
        if (!scrapedURLs.has(link)) {
          url = link;

          // Add the scraped URL to the set
          scrapedURLs.add(url);
        }
      });
    }
  } while (url);

  // do {
  //   // Check if the URL is already scraped
  //   if (scrapedURLs.has(url)) {
  //     console.log(`URL already scraped: ${url}`);
  //   } else {
  //     // Scrape data for the current product
  //     await getData(url, page);

  //     // Get the URL of the next product
  //     const nextProductUrls = await page.evaluate(() => {
  //       const links = document.querySelectorAll(
  //         ".recommend-product-item .product-item-link"
  //       );
  //       return Array.from(links).map((link) => link.href);
  //     });

  //     console.log(nextProductUrls);

  //     // If there's a next product URL, set it as the new URL; otherwise, exit the loop
  //     if (nextProductUrls.length > 0) {
  //       // remove the query string from the URL after .html
  //       nextProductUrls.forEach((link) => {
  //         const formattedUrl = link.split("?")[0];

  //         // If the URL is not the same as the current URL and not already scraped, set it as the new URL
  //         if (formattedUrl !== url && !scrapedURLs.has(formattedUrl)) {
  //           url = formattedUrl;
  //         }
  //       });
  //     } else {
  //       break; // No more products to scrape, exit the loop
  //     }

  //     // Add the scraped URL to the set
  //     scrapedURLs.add(url);
  //   }
  // }while (url);

  // 4. Close the browser
  await browser.close();
};

fun();
