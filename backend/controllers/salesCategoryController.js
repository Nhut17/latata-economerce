const salesCategory = require('../models/salesCategory')
const SalesCate = require('../models/salesCategory')




exports.addSaleCate = async ( req,res) => {
        const { sales_cate, cate, quantity, year, month} = req.body

        const check_sale_cate = await SalesCate.findOne({
            month: month,
            year: year
        })
        
        console.log('check: ', check_sale_cate)
        // sale cate hasn't 
        if(!check_sale_cate)
        {
            const list_sale_cate = [
                {
                    cate,
                    sales_cate,
                    quantity
                }
            ]

            const sales_cates = await SalesCate.create({
                categories: list_sale_cate,
                year,
                month
            })

            res.status(201).json({
                success: true,
                sales_cates
            })
           
        } 
        else{

        // if sale cate have
       const cates = check_sale_cate.categories
       const indx = cates?.findIndex(el => el.cate == cate)
        console.log(indx)
        if(indx >= 0)
        {
            // update sales and quantities
            cates[indx].quantity += quantity
            cates[indx].sales_cate += sales_cate
        }
        else {
            // create new category
            const new_cate = {
                cate,
                sales_cate,
                quantity
            }
        cates.push(new_cate)

        }


        const sales_cates = await SalesCate.findByIdAndUpdate(check_sale_cate._id,{
               categories: cates
            },{
                new: true,
                runValidators: true,
                useFindAndModify: true
            })
    
            
    
            res.status(201).json({
                success: true,
                sales_cates
            })

        }
        
}


exports.salesCate = async ( req, res) => {

    const { year} = req.body


    const sales_cate = await SalesCate.find({
        year: year
    })

    let new_categories = []

    sales_cate.forEach(element => {
        
        element.categories.forEach(category => {
            
            const find_index = new_categories.findIndex(el => el.cate.toLowerCase() === category.cate.toLowerCase());
           
            if(find_index > -1)
            {
                new_categories[find_index].sales_cate += category.sales_cate
            }
            else{
                new_categories.push(category)
            }
                 
        
        })

    });


    res.status(201).json({
        success: true,
        sales_cates_year: new_categories
    })

}


exports.selectSalesCate = async (req,res) => {

    const { year, month} = req.body

    const sale_cates = await salesCategory.findOne({
        year,
        month
    })

    

    if(!sale_cates)
    {
        res.status(401).json({
            success:false,
            message: 'Could not find sales category'
        })

        return 
    }


    res.status(201).json({
        success: true,
        sale_cates
    })

}


