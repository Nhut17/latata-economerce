import { React, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { cancelByUser } from '../../redux/reducer/orderSlice'

import EachTransaction from './EachTransaction'
const OrderList = ({ data }) => {
    const [evaluated, setEvaluated] = useState(
        data?.status === 'DONE' ? true : false
    )

    return (
        <div className='order-detail'>
        {data?.status === 'DONE' &&
        <p className='summary-status-done'><i class="fa-solid fa-circle icon"></i> Giao hàng thành công</p>
    }
         {
            data.orderItems.map(orders => (
                
            ))
         }
            <EachTransaction evaluated={evaluated}
                            orders={data.orderItems} />
           
          
            <div className='summary-order flex j-between'>
                
                <p className='summary-address'>Địa chỉ:<b>{data.address}</b></p>
                <p className='summary-date'>Ngày đặt: <b>{data.createAt}</b></p>
                <p className='summary-phone'>Số điện thoại: <b>{data.phoneNo}</b></p>
                {data?.status === 'PENDING' &&
                    <p className='summary-status-pending'><i class="fa-solid fa-circle icon"></i> {data?.status}</p>
                }
                
                
                {data?.status === 'CANCELED' &&
                    <p className='summary-status-cancel'><i class="fa-solid fa-circle icon"></i> {data?.status}</p>
                } 

                <p className='summary-total-price'>Tổng tiền: {data.totalPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className='currency'>&#8363;</span></p>
            </div>
            {/* <div className='cancel-order' hidden={data?.status === 'PENDING' ? false : true}>
                <button>Hủy đơn hàng </button>
            </div> */}

            <div className="action flex ">
                <div className='btn-action '>
                    <button>Hủy đơn hàng </button>
            </div>

            <div className='btn-action '>
                <button>Đánh giá</button>
            </div>

            </div>

            
     </div>
    )
}
export default OrderList