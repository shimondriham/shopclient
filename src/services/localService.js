// save short ids of products we visited in to show after in the home page
export const VISITED_PRODUCT = "visitedProduct";


export const addProdVisitedToLocal = (_short_id) => {
  // if there local of products local_ar equal to the data in local if not equal to new array
  let local_ar = JSON.parse(localStorage[VISITED_PRODUCT]) || [];
  // add new cell in array in the start
  local_ar.unshift(_short_id);
  // for save only 4 products
  local_ar.splice(4, local_ar.length);
  localStorage.setItem(VISITED_PRODUCT, JSON.stringify(local_ar));

}