import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/Carousel'


import { listProducts } from '../redux/productActions'

// import products from '../products'

function HomeScreen({ history }) {
    // const [products, setProducts] = useState([])

    // const dispatch = useDispatch()
    // const allproducts = useSelector(state => state.allproducts)
    // const { error, loading, products } = allproducts
    // console.log(allproducts)

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword = history.location.search

    useEffect(() => {

        // Pass search keyword to Django
        dispatch(listProducts(keyword))



        // async function fetchProducts() {
        //     const { data } = await axios.get('/api/products/')
        //     setProducts(data)
        // }
        // fetchProducts()

    }, [dispatch, keyword])


    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>
            {loading ? <h2><Loader /></h2>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword} />
                        {/* <Paginate pages={pages} page={page} /> */}

                    </div>
            }
        </div >
    )
}

export default HomeScreen