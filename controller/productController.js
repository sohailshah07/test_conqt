const productModel = require("../database/models/product");
const {getPaginatedResponse, convertPagination} =require("../utility/paggination")

exports.getProduct = async (req, res, next)=>{
    try {
        const {
            pageSize = 10,
            currentPage = 1,
            orderBy = "createdAt",
            orderDir = "desc",
            searchBy = "",
            searchFields = []
        } = req.query

        const {limit, offset} = convertPagination(pageSize, currentPage);

        const param = {limit, offset, orderBy, orderDir, searchBy, searchFields}

        const data = productModel.getProduct(param);
        const totalCount = productModel.getTotalProductCount(searchBy, searchFields);

        const response = getPaginatedResponse(data, currentPage, limit,totalCount)

        return res.status(200).json(response)

    } catch (error) {
        console.error("unable to get product" + error)
        return resizeBy.status(500).json({message:"Internal Server Error"})
    }
}