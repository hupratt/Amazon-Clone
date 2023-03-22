import React,{useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ProductList from '../components/ProductList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css"
import Product from '../components/Product'
import { listProducts } from '../actions/ProductActions'
import banner7 from "../assets/banner7.png"
import banner8 from "../assets/banner8.jpg"
import banner6 from "../assets/banner6.png"

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    const productList = useSelector( state => state.productList);
    const {products} = productList;

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 900,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 680,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }  
            },
            
        ]
    }

    return (
        <div className="home-page-container">

            <div className="banner-container">

                <Slider {...settings}>

                    <div className="banners">
                      <img src={banner6} alt=""/>
                    </div>
                    <div className="banners">
                      <img src={banner7} alt=""/>
                    </div>
                    <div className="banners">
                      <img src={banner8} alt=""/>
                    </div>

                </Slider>
            
            </div>
            
            <ProductList/>


            <div className="home-product-slider">

                <h2 className="sec-title">More Products</h2>

                <Slider {...settings2}>

                    {products && products.map((product)=>{
                            return(
                                <Product key={product._id} product={product} /> 
                            )
                        })
                    }

                </Slider>
            </div>


        </div>
    )
}

export default Home
