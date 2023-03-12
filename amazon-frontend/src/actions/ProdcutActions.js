import axios from "../Axios";
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS 

} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST 
    });

    try{
        const {data} = await axios.get("/api/products");
        // const count = data.length;
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}



export const detailsProduct = (productID) => async (dispatch) =>{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productID
    });

    try{
        // const {data} = await axios.get(`/api/products/${productID}`);
   
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: {"_id":"5ff2322666162a4c342d5922","image":"https://specials-images.forbesimg.com/imageserve/5ede6a4407e58a0007201a40/960x0.jpg?cropX1=33&cropX2=1935&cropY1=0&cropY2=1267","name":"Ultrawide Monitor","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.","category":"Monitor","brand":"LG","price":320,"rating":4,"numRev":60,"stock":14,"__v":0,"createdAt":"2021-01-03T21:07:50.117Z","updatedAt":"2021-01-03T21:07:50.117Z"}
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.mesaage
            ? error.response.data.message
            : error.message,
        });
    }
};