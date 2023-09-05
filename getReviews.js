const getReviews = async (page) => {
  const reviewsLocation = ".item";

  try {
    // Scroll the page to load more content
    let maxScrolls = 10; // Max number of times to scroll

    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() => {
        // scroll a window height every time in .3 seconds intervals
        window.scrollBy(0, window.innerHeight);
      });
      await page.waitForTimeout(100); // Wait for some time after scrolling
    }

    await page.waitForTimeout(100); // Wait for some time after scrolling

    // Now that the content is loaded, select and extract the reviews
    const reviewsData = await page.evaluate((reviewsLocation) => {
      const reviews = document.querySelectorAll(reviewsLocation);
      const reviewsData = [];

      reviews.forEach((review) => {
        const comment = review.querySelector(".content").innerText;
        reviewsData.push(comment);
      });

      return reviewsData;
    }, reviewsLocation);

    return reviewsData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getReviews;
