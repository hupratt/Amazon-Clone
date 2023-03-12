// import axios from "../Axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/CartConstant";

export const addToCart = (productID,qty) => async(dispatch, getState) =>{
    // const {data} = await axios.get(`/api/products/${productID}`);
    const data = {"_id":"5ff2322666162a4c342d5922","image":"https://specials-images.forbesimg.com/imageserve/5ede6a4407e58a0007201a40/960x0.jpg?cropX1=33&cropX2=1935&cropY1=0&cropY2=1267","name":"Ultrawide Monitor","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.","category":"Monitor","brand":"LG","price":320,"rating":4,"numRev":60,"stock":14,"__v":0,"createdAt":"2021-01-03T21:07:50.117Z","updatedAt":"2021-01-03T21:07:50.117Z"}
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            stock: data.stock,
            product: data._id,
            qty,
        }
    })


    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};


export const removeFromCart = (productID) => (dispatch,getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productID
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });
}
