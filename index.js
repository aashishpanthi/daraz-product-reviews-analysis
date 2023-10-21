import puppeteer from "puppeteer";
import getData from "./getData.js";
import data from "./convertedData.json" assert { type: "json" };
// import Sentiment from "sentiment";
// import fs from "fs";
// import csv from "csv-parser";

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
    "https://www.daraz.com.np/products/mini-collar-microphone-i127430043-s1034525971.html";

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

// fun();

/* Sentiment Analysis

const sentiment = new Sentiment();

// analyze the sentiment
const rawData = data;

const analyzedData = rawData.map((item) => {
  // loop over each review and collectively analyze the sentiment
  const reviews = item.reviews.map((review) => {
    const { score, comparative, positive, negative } =
      sentiment.analyze(review);
    return { score, comparative, positive, negative };
  });

  // get the average score of all the reviews
  const averageScore =
    reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length;

  // get the average comparative of all the reviews
  const averageComparative =
    reviews.reduce((acc, review) => acc + review.comparative, 0) /
    reviews.length;

  // get all the positive words
  const positiveWords = reviews.reduce(
    (acc, review) => [...acc, ...review.positive],
    []
  );

  // get all the negative words
  const negativeWords = reviews.reduce(
    (acc, review) => [...acc, ...review.negative],
    []
  );

  return {
    ...item,
    averageScore,
    averageComparative,
    positiveWords,
    negativeWords,
  };
});

const flattenedData = analyzedData.flat();

fs.writeFileSync(
  "./reviews.json",
  JSON.stringify(flattenedData, null, 2),
  "utf-8"
);

*/

/*get all the words
 const words = reviews
   .map(({ positiveWords, negativeWords }) => {
     return [...positiveWords, ...negativeWords];
   })
   .flat();

 fs.writeFileSync("./words.json", JSON.stringify(words, null, 2), "utf-8");
*/

/* Convert csv to json  
const inputFile = "data.csv"; // Replace with the path to your CSV file
const outputFile = "convertedData.json"; // Replace with the desired output JSON file name

const results = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => {
    // Check if the 'reviews' column has newline characters
    if (data.Reviews.includes("\n")) {
      // Split the multiline cell into an array using commas as the delimiter
      data.Reviews = data.Reviews.split("\n").map((review) => review.trim());
    } else {
      // If there are no newline characters, convert it to a single-element array
      data.Reviews = [data.Reviews];
    }

    // Convert keys to lowercase
    const lowerCaseData = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        lowerCaseData[key.toLowerCase()] = data[key];
      }
    }

    results.push(lowerCaseData);
  })
  .on("end", () => {
    // Write the parsed data to a JSON file
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(
      `CSV file "${inputFile}" has been converted to JSON: "${outputFile}"`
    );
  });
*/
