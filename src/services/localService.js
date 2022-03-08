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
  let local_ar = localStorage[VISITED_PRODUCT] ? localStorage[VISITED_PRODUCT].split(",") : [];
  if (!local_ar.includes(_short_id)) {
    local_ar.unshift(_short_id);
    local_ar.splice(4, local_ar.length);
    localStorage.setItem(VISITED_PRODUCT, local_ar.join(","));
  }
}


export const checkVisitedLocal = () => {
  if (localStorage[VISITED_PRODUCT]) {
    return localStorage[VISITED_PRODUCT];
  }
  return null;
}