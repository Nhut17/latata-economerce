import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SubProduct = () => {

    const { listProduct } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const { category, sub} = useParams()

    console.log('cate: ' + category)
    console.log('cate: ' + category)

    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
      }, [])

  return (
    <div className='sub-product'>
        
    </div>
  )
}

export default SubProduct
