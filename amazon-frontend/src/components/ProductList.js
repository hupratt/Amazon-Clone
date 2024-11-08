import React,{useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import '../styles/ProductList.css'
import Product from './Product'
import MessageBox from "./MessageBox"
import { listProducts } from '../actions/ProductActions'
import loadingBox from "../assets/giphy.gif"



const ProductList = () => {

    const dispatch = useDispatch();

    const productList = useSelector( state => state.productList);
    const {loading,error,products} = productList;


    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])


    return (

        <div className="home-product-container">
            {loading ? <div className='img-overlay'><img src={loadingBox} alt="loading gif. Used as a placeholder temporarily" /></div>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <>
                <h2 className="sec-title">Products</h2>
                <div className="product-container">
                    {products.map((product)=>{
                        return(
                            <Product key={product._id} product={product}/> 
                        )
                        })
                    }
                </div>
                </>
            )
            }

        </div>
            
        
    )
}

export default ProductList
