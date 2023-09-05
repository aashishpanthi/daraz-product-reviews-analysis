const getBrandName = async (page) => {
  const brandLocation = ".pdp-product-brand > a.pdp-product-brand__brand-link";
  const brandName = page.evaluate((brandLocation) => {
    const brand = document.querySelector(brandLocation).innerText;
    return brand;
  }, brandLocation);
  return brandName;
};

export default getBrandName;
