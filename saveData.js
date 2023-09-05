import fs from "fs";
import { parse, stringify } from "csv-string";

const saveData = async (data) => {
  // Define the CSV file path
  const csvFilePath = "data.csv";
  // Define the JSON file path
  const jsonFilePath = "data.json";

  // Define custom header names for CSV
  const customHeader = [
    "Name",
    "Category",
    "URL",
    "Price",
    "Image",
    "Brand",
    "Seller",
    "Ratings",
    "Total Reviews",
    "Reviews",
  ];

  // Extract the relevant properties from the data object
  const {
    name,
    category,
    url,
    price,
    image,
    brand,
    seller,
    ratings,
    totalRatings,
    reviews,
  } = data;

  // Prepare the data as a CSV array
  // Convert the reviews array to a single string with line breaks
  const formattedReviews = reviews.join("\n");
  const csvData = [
    name,
    category,
    url,
    price,
    image,
    brand,
    seller,
    ratings,
    totalRatings,
    formattedReviews,
  ];

  // Prepare the data for JSON
  const jsonData = {
    name,
    category,
    url,
    price,
    image,
    brand,
    seller,
    ratings,
    "Total Reviews": totalRatings,
    reviews,
  };

  try {
    if (fs.existsSync(csvFilePath)) {
      // If the CSV file exists, read its content and append the new data
      const fileContent = fs.readFileSync(csvFilePath, "utf-8");
      const existingData = parse(fileContent);

      // Append the new data to the existing data
      existingData.push(csvData);

      // Write the updated data back to the CSV file with the custom header
      fs.writeFileSync(csvFilePath, stringify(existingData));
    } else {
      // If the CSV file doesn't exist, create a new file with the custom header and the new data
      const header = customHeader.join(",") + "\n";
      fs.writeFileSync(csvFilePath, header + stringify([csvData]));
    }

    // Append the data to the JSON file
    if (fs.existsSync(jsonFilePath)) {
      const existingJsonData = JSON.parse(
        fs.readFileSync(jsonFilePath, "utf-8")
      );
      existingJsonData.push(jsonData);
      fs.writeFileSync(jsonFilePath, JSON.stringify(existingJsonData));
    } else {
      fs.writeFileSync(jsonFilePath, JSON.stringify([jsonData]));
    }

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export default saveData;
