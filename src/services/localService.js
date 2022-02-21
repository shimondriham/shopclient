// save short ids of products we visited in to show after in the home page
export const VISITED_PRODUCT = "visitedProduct";
export const SHOP_TOKEN = "tok";
export const CART = "cart_shop"


export const saveCartLocal = (_cart_ar) => {
  localStorage.setItem(CART, JSON.stringify(_cart_ar))
}

export const getCartFromLocal = () => {
  if(localStorage[CART]){
    return JSON.parse(localStorage[CART]);
  }
  return [];
}

export const saveTokenLocal = (_token) => {
  localStorage.setItem(SHOP_TOKEN, _token);
}

export const checkTokenLocal = () => {
  if(localStorage[SHOP_TOKEN]){
    return localStorage[SHOP_TOKEN];
  }
  else{
    return false;
  }
}

export const deleteToken = () => {
  localStorage.removeItem(SHOP_TOKEN)
}

export const addProdVisitedToLocal = (_short_id) => {
  // if there local of products local_ar equal to the data in local if not equal to new array
  // Primitive array cant do stringfy or parse , need to use split or join
  // split - like parse of JSON for primtive array
  let local_ar = localStorage[VISITED_PRODUCT] ? localStorage[VISITED_PRODUCT].split(",") : [];
  // check if id already in local 
  if (!local_ar.includes(_short_id)) {
    // add new cell in array in the start
    local_ar.unshift(_short_id);
    // for save only 4 products
    local_ar.splice(4, local_ar.length);
    // console.log(local_ar)
    // Primitive array cant do stringfy or parse , need to use split or join 
    // join like stringfy of JSON just for primitive array
    localStorage.setItem(VISITED_PRODUCT, local_ar.join(","));
  }
}

// return the shorts_id of products we visited as string for 
// URL to api request
export const checkVisitedLocal = () => {
  if (localStorage[VISITED_PRODUCT]) {
    return localStorage[VISITED_PRODUCT];
  }
  return null;
}