const getBasicDetails = async (page) => {
  const nameLocation = ".pdp-mod-product-badge-title";
  const priceLocation = ".pdp-product-price > span";
  const imageLocation = ".gallery-preview-panel__content > img";

  const data = await page.evaluate(
    (nameLocation, priceLocation, imageLocation) => {
      const name = document.querySelector(nameLocation).innerText;
      const price = document.querySelector(priceLocation).innerText;
      const image = document.querySelector(imageLocation).src;
      return { name, price, image };
    },
    nameLocation,
    priceLocation,
    imageLocation
  );

  return data;
};

export default getBasicDetails;
