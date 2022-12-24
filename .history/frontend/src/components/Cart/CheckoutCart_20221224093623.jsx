import React from 'react'
import '../../sass/cart/checkoutCart.scss'
import { Link, useNavigate } from 'react-router-dom'
import InfoCustomer from './InfoCustomer'
import Voucher from './Voucher'
import FinalTotal from './FinalTotal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ActiveCart from './ActiveCart'
import EmptyCart from './EmptyCart'
import { getCartUser } from '../../redux/Cart/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAddress } from '../../redux/address/addressSlice'

const CheckoutCart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { listCartUser } = useSelector(state => state.cart)
  const {successOrder } = useSelector(state => state.order)

  console.log(successOrder)
  // toastify success order
  useEffect(() => {
    if(successOrder){
      navigate('/thanks')
      
    }
    
  }, [successOrder]);

  useEffect(() => {
    dispatch(getCartUser())
  
  },[])

  return (
    <React.Fragment>

      {
        listCartUser?.products &&
        listCartUser?.products.length > 0 ? <ActiveCart listCartUser={listCartUser} /> : <EmptyCart />
      }
        
        
    </React.Fragment>
  )
}

export default CheckoutCart
