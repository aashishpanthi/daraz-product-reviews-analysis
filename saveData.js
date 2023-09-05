import fs from "fs";
import { parse, stringify } from "csv-string";

const saveData = async (data) => {
  // Define the CSV file path
  const filePath = "data.csv";

  // Define custom header names
  const customHeader = [
    "Name",
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
    url,
    price,
    image,
    brand,
    seller,
    ratings,
    totalRatings,
    formattedReviews,
  ];

  console.log("Saving data...");
  console.log(csvData);

  try {
    if (fs.existsSync(filePath)) {
      // If the file exists, read its content and append the new data
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const existingData = parse(fileContent);

      // Append the new data to the existing data
      existingData.push(csvData);

      //   Write the updated data back to the file with the custom header
      fs.writeFileSync(filePath, stringify(existingData));
    } else {
      // If the file doesn't exist, create a new file with the custom header and the new data
      const header = customHeader.join(",") + "\n";
      fs.writeFileSync(filePath, header + stringify([csvData]));
    }

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export default saveData;
