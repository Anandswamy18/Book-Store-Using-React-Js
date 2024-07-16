    import { getCookie } from 'cookies-next';
import axios from 'axios'

const headerConfig = {
    headers:{
    'x-access-token':localStorage.getItem('tokens')


    }
};
const token = getCookie('cookie');
if (token) {
    console.log('Token:', token);
} else {
    console.log('Token not found.');
}

export const getBooks = async() =>{
    let response = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book",headerConfig)
    console.log(response)
    return response
    
}

//cart Services

export const addCartItem = async(data) => {
    let response = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${data}`,data,headerConfig)
    return response
}

export const getCartItems = async() => {
    let response = await axios.get('https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items',headerConfig)
    return response
}

export const modifyCartItem = async(id,data) => {
    let response = await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`,data,headerConfig)
    return response
}

export const removeCartItem = async(id) => {
    let response = await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`,headerConfig)
    return response
}

export const userAddress = async(data) => {
    let response = await axios.put(`https://bookstore.incubation.bridgelabz.com/bookstore_user/edit_user`,data,headerConfig)
    return response
}

export const orderItems = async (data) => {
    let response = await axios.post("https://bookstore.incubation.bridgelabz.com/bookstore_user/add/order",data,headerConfig);
    console.log(response)
    return response;
  }

  export const getWishList = async () => {
    let response = await axios.get("https://bookstore.incubation.bridgelabz.com/bookstore_user/get_wishlist_items",headerConfig);
    console.log('getWishList',response)
    return response;
  }
  
  export const postWishList = async (id) => {
    let response = await axios.post(`https://bookstore.incubation.bridgelabz.com/bookstore_user/add_wish_list/${id}`,'',headerConfig);
    console.log(response)
    return response;
  }
  
  export const deleteWishList = async (id) => {
    let response = await axios.delete(`https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_wishlist_item/${id}`,headerConfig);
    console.log(response)
    return response;
  }
  
  
export const getFeedback = async(id) => {
    let response = await axios.get(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/get/feedback/${id}`,
      headerConfig
    );
    console.log(response);
    return response;
  }
  
  export const addFeedback = async(id,data) => {
    let response = await axios.post(
      `https://bookstore.incubation.bridgelabz.com/bookstore_user/add/feedback/${id}`,
      data,
      headerConfig
    );
    return response;
  }
  