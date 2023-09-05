const getCategory = async (page) => {
  const categoryLocation =
    "#J_breadcrumb_list #J_breadcrumb .breadcrumb_item .breadcrumb_item_text > a";
  await page.waitForSelector(categoryLocation);

  const category = await page.evaluate((categoryLocation) => {
    const category = document.querySelector(categoryLocation).innerText;

    return category;
  }, categoryLocation);

  return category;
};

export default getCategory;
