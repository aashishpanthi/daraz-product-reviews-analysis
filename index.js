import puppeteer from "puppeteer";
import getData from "./getData.js";
import data from "./data.json" assert { type: "json" };

const fun = async () => {
  // 1. Create a new browser instance
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 900,
      height: 600,
    },
    args: ["--no-sandbox"],
  });

  // 2. Create a new page instance
  const page = await browser.newPage();

  let url =
    "https://www.daraz.com.np/products/baby-try-cycle-with-push-handle-i116220277-s1031781847.html";

  const scrapedURLs = new Set(data?.map((item) => item.url));

  console.log(data.length);

  do {
    await getData(url, page);

    const nextProductUrls = await page.evaluate(() => {
      const links = document.querySelectorAll(
        ".recommend-product-item .product-item-link"
      );
      return Array.from(links).map((link) => link.href.split("?")[0]);
    });

    let links = [];

    if (nextProductUrls.length > 0) {
      links = nextProductUrls.map((link) => {
        if (!scrapedURLs.has(link)) {
          // Add the scraped URL to the set
          scrapedURLs.add(url);

          return link;
        } else {
          return null;
        }
      });

      // Remove the null and undefined values from the links array
      links = links.filter((link) => link);

      console.log(links);

      const randomNum = Math.random();
      const randomIndex = parseInt(randomNum * links.length);

      url = links[randomIndex];
      console.log(url);
      scrapedURLs.add(url);
    }
  } while (url);

  // 4. Close the browser
  await browser.close();
};

// (async () => {
//   let links = [];

//   for (let i = 1; i <= 100; i++) {
//     const url = "https://www.daraz.com.np/computing/?ajax=false&page=" + i;

//     console.log(url);

//     // do a fetch request to get the api data
//     const response = await fetch(url);

//     // convert the response to json
//     const data = await response.json();

//     console.log(data);

//     // get the product list from the json data
//     const productList = data.mods.listItems;

//     // get the product urls from the product list
//     const productUrls = productList.map(
//       (product) => product.link.split("?")[0]
//     );

//     // add the product urls to the links array
//     links = [...links, ...productUrls];
//   }
//   // save the product urls to a json file
//   fs.writeFileSync("links.json", JSON.stringify(links, null, 2), "utf-8");

//   console.log(links.length);
//   console.log("Done");
// })();

fun();
