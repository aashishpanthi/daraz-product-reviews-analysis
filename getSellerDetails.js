const getSellerDetails = async (page) => {
  const sellerLocation = ".seller-name__detail > a.seller-name__detail-name";
  const sellerName = await page.evaluate((sellerLocation) => {
    const seller = document.querySelector(sellerLocation).innerText;
    return seller;
  }, sellerLocation);
  return sellerName;
};

export default getSellerDetails;
