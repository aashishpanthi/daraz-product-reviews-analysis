const getRatings = async (page) => {
  const totalRatingsLocation =
    ".pdp-review-summary > a.pdp-link.pdp-link_size_s.pdp-link_theme_blue.pdp-review-summary__link";
  const ratingsLocation = ".summary .score .score-average";

  const ratings = await page.evaluate(
    (totalRatingsLocation, ratingsLocation) => {
      const noOfRatings =
        document.querySelector(totalRatingsLocation).innerText;

      const ratings = document.querySelector(ratingsLocation).innerText;

      return {
        totalRatings: noOfRatings
          ? `${noOfRatings}`.replace(" Ratings", "")
          : 0,
        ratings,
      };
    },
    totalRatingsLocation,
    ratingsLocation
  );

  return ratings;
};

export default getRatings;
