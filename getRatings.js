const getRatings = async (page) => {
  const ratingsLocation =
    ".pdp-review-summary > a.pdp-link.pdp-link_size_s.pdp-link_theme_blue.pdp-review-summary__link";
  const ratings = await page.evaluate((ratingsLocation) => {
    const ratings = document.querySelector(ratingsLocation).innerText;
    return ratings;
  }, ratingsLocation);

  return ratings ? `${ratings}`.replace(" Ratings", "") : 0;
};

export default getRatings;
