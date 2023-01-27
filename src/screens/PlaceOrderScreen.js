import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { PayPalButton } from "react-paypal-button-v2"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../redux/orderActions'
// import {ORDER_CREATE_RESET} from '../constants/orderConstants'

// removed history from place order screen {history}
function PlaceOrderScreen({ history }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)


    //For paypal
    // const [sdkReady, setSdkReady] = useState(false)

    // const addPayPalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = 'https://www.paypal.com/sdk/js?client-id=AZ4orKf8R8oQK54ei5c3jBW7bqAAk37ifW3HwHNBgIc6trpeVqy6OWrT7ry0Uf7UAH9qo_6ePrHRSp07'
    //     script.async = true
    //     script.onload = () => {
    //         setSdkReady(true)
    //     }
    //     // append script to DOM when it is ready
    //     document.body.appendChild(script)
    // }

    // Add cart properties for this page only (created constants insteads of modifying cart)
    // cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    // cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    // cart.taxPrice = Number((0.0875) * cart.itemsPrice).toFixed(2)

    // cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)



    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = Number((0.0875) * itemsPrice).toFixed(2)
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            // dispatch({ type: ORDER_CREATE_RESET })
        }

    }, [success, history])

    // const placeOrder = () => {
    //     dispatch(createOrder({
    //         orderItems: cart.cartItems,
    //         shippingAddress: cart.shippingAddress,
    //         paymentMethod: cart.paymentMethod,
    //         itemsPrice: cart.itemsPrice,
    //         shippingPrice: cart.shippingPrice,
    //         taxPrice: cart.taxPrice,
    //         totalPrice: cart.totalPrice,
    //     }))
    // }

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
    }

    // const placeOrder = () => {
    //     console.log('Place Order')
    // }

    const successPaymentHandler = (paymentResult) => {

    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>

                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <h5>
                                Address: {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {'    '}
                                {cart.shippingAddress.postalCode},
                                {'    '}
                                {cart.shippingAddress.state},
                                {'    '}
                                {cart.shippingAddress.country}
                            </h5>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <h5>
                                Method: {cart.paymentMethod}
                            </h5>
                            {/* <PayPalButton /> */}
                            <PayPalScriptProvider options={{ "client-id": "AZ4orKf8R8oQK54ei5c3jBW7bqAAk37ifW3HwHNBgIc6trpeVqy6OWrT7ry0Uf7UAH9qo_6ePrHRSp07" }}>
                                <PayPalButtons style={{ layout: "vertical" }} disabled={true} />
                            </PayPalScriptProvider>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className='h5'>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`} className='h5'>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}


                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup varaint='flush' className='h6'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    {/* <Col>${cart.itemsPrice}</Col> */}
                                    <Col>${itemsPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    {/* <Col>${cart.shippingPrice}</Col> */}
                                    <Col>${shippingPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    {/* <Col>${cart.taxPrice}</Col> */}
                                    <Col>${taxPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    {/* <Col>${cart.totalPrice}</Col> */}
                                    <Col>${totalPrice}</Col>

                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className="d-grid gap-2">

                                    <Button type='button' className='btn-primary'
                                        // disabled={cart.cartItems === 0}
                                        disabled
                                        onClick={placeOrder}>
                                        Place Order
                                    </Button>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item className='text-capitalize'>
                                *Place order button deactivated. Website currently for demonstration purposes only.
                            </ListGroup.Item>
                        </ListGroup>


                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default PlaceOrderScreen