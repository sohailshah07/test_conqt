exports.getPaginatedResponse = async (data, page, limit,totalCount)=>{
    const currentPage = page ? page : 1;
    const totalPages = Math.ceil(totalCount/limit);

    return {
       currentPage,
       pageSize,
       totalPages,
       totalCount,
       data
    }
}
exports.convertPagination = async (pageSize, currentPage)=>{
    const limit = pageSize? pageSize:10;
    const offset = currentPage? (currentPage-1) * limit : 0;

    return {
        limit,
        offset,
    }
}