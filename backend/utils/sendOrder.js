const nodemailer = require('nodemailer')
require('dotenv').config();




const sendOrder = async options => {

    const { order } = options

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure:false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    //   const listOrder = order.orderItems.map(data => )

   
      const html = `
        <html>
            <body>
                <div class="logo">
                    <img src="https://res.cloudinary.com/dx8xengfd/image/upload/v1670955574/avatars/logo_color_upyntn.png" alt="">
                    <h1 style="color: #000b49;">Thanks for your order</h1>
                </div>
                <div>
                    <button>XEM HÓA ĐƠN</button>
            
                </div>
    
                <div class="order-detail">
                    <div class="summary">
                        <h3 style="color: black;">THÔNG TIN</h3>
                        <p>Mã đơn hàng : #${order._id} </p>
                        <p>Ngày đặt hàng : ${order.createAt} </p>
                        <p>Ngày vận chuyển : ${options.deliverAt} </p>
                        <p><b>Tổng hóa đơn : ${order.totalPrice.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</b></p>
                        <p>Địa chỉ : ${order.address}</p>

                    </div>
                    
                </div>

                <p style="color: orange;">${options.message}</p>
        
                <br/>
        
            
                
            
            </body>

            
        </html>
  
  `

      const message = {
        from: '"LATATA Shop" <quynhnhutg6@gmail.com>',
        to: options.email,
        subject: options.subject,
        html: html
      }
      await transporter.sendMail(message)

}





module.exports = sendOrder;