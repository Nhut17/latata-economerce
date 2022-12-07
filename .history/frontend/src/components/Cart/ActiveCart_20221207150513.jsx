import React from 'react'
import '../../sass/cart/checkoutCart.scss'
import ListingCart from './ListingCart'
import { Link } from 'react-router-dom'
import InfoCustomer from './InfoCustomer'
import Voucher from './Voucher'
import FinalTotal from './FinalTotal'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const ActiveCart = ({listCartUser}) => {
  return (
    <div className='container container-cart'>
        <div className="title">
            <Link to='/' className="buy-another">Mua thêm sản phẩm khác</Link>
            <span >Giỏ hàng của bạn</span>
        </div>

        <div className='info-cart'>
            <ListingCart listCart={listCart}  />
            <InfoCustomer />
            <Voucher />
            <FinalTotal />
        </div>
    </div>
  )
}

export default ActiveCart
