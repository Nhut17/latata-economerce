import React, { useEffect } from 'react'
import { useContext } from 'react'
import { WatchContext } from '../../context/watchContext'
import TopSlider from '../Tablet/TopSlider'
import WatchTypes from './WatchTypes'
import CollectionWatch from './CollectionWatch'
import LineStrap from './LineStrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCate, resetListCate } from '../../redux/Product/productSlice'
const MainWatch = () => {
    const context = useContext(WatchContext)

    const {listProductCate} = useSelector(state => state.product)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(resetListCate())
      dispatch(getProductCate('63821a6e08b0e4ab8b016cc9'))
    },[])

  return (
    
    <div className='main-watch'>
      <div className="container">
        <TopSlider  sliders={context.sliderWatch} 
                    banners={context.bannerWatch}/>
        <CollectionWatch/>

        <div className="wt-for-men wt-border">
            <WatchTypes 
                listType={context.WatchCategories}
                idType={context.WatchCategories[2].id}
                listProduct= {listProductCate}
              />
          </div>

          <div className="wt-for-women wt-border">
            <WatchTypes 
                listType={context.WatchCategories}
                idType={context.WatchCategories[3].id}
                listProduct= {listProductCate}
  
              />
          </div>

          <div className="wt-for-couple wt-border">
            <WatchTypes 
                listType={context.WatchCategories}
                idType={context.WatchCategories[4].id}
                listProduct= {listProductCate}
    
              />
          </div>

          <div className="wt-for-children wt-border">
            <WatchTypes 
                listType={context.WatchCategories}
                idType={context.WatchCategories[5].id}
                listProduct= {listProductCate}
        
              />
          </div>

          <LineStrap linestrap={context.width_line_strap}/>
      </div>
    </div>
  )
}

export default MainWatch