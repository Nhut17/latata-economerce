import React, { useEffect } from "react";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  UsergroupDeleteOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import "./DashBoard.scss";
import ChartDashBoard from "./ChartDashBoard";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../../redux/Admin/adminSlice";

export default function DashBoard() {

  const dispatch  = useDispatch()
  const { listUser } = useSelector(state => state.admin)
  const { listProduct } = useSelector(state => state.product)
  const { listOrder } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getAllUser())
}, [])

  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content" >
              <li style={{background : '#990000'}}>
                <div className="dashboard-middle-statistic-icon">
                  <UsergroupDeleteOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{listUser?.length}</span>
                  <span className="title" style={{fontSize: '20px'}}>Người dùng</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li style={{background : '#2B7A0B'}}>
                <div className="dashboard-middle-statistic-icon">
                <DollarCircleOutlined/>

                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{listProduct?.length}</span>
                  <span className="title">Sản phẩm</span>
                </div>
              </li>
            </div>

            <div className="dashboard-middle-statistic-content">
              <li style={{background : '#000957'}}>
                <div className="dashboard-middle-statistic-icon">
                  <SkinOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1208</span>
                  <span className="title">Danh mục</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li style={{background : '#D4AC2B'}}>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingCartOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{listOrder?.length}</span>
                  <span className="title">Đơn hàng</span>
                </div>
              </li>
            </div>
            
          </div>
          {/* <ChartDashBoard></ChartDashBoard> */}
        </div>

       
      </div>
    </section>
  );
}
