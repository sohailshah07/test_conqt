const db = require("../index")

exports.getProduct = async (params)=>{
    const {limit, offset, orderBy, orderDir, searchBy, searchFields} = params;
    let query = `SELECT p.*,
                    v.VendorOrganizationId, v.CompanyName, v.OrganizationLogoUrl, v.OrganizationLogoName
                FROM ProductV2 p
                LEFT JOIN VendorsOrganizations v ON ProductV2 = v.VendorOrganizationId
                `
    // add search 
    if(searchBy && searchFields.length > 0){
        query += `WHERE `;
        for (let i = 0; i < searchFields.length; i++) {
            query += `${searchFields[i]} LIKE ?`
            if(i < searchFields.length-1){
                query += `OR `
            }
            
        }
    }
    // add sorting
    query += `ORDER BY ${orderBy} ${orderDir}`;
    // add pagination
    query += `LIMIT ? OFFSET ?`;
    //search parameters
    const searchParam = searchFields.map(()=>`%${searchBy}%`);

    const [data] = await db.promise().query(query, [...searchParam, limit, offset]);
    return data;
    
}


exports.getTotalProductCount = async (searchBy, searchFields)=>{
    let query = `SELECT COUNT(*) AS totalCount FROM ProductV2 `;
    // add search 
    if(searchBy && searchFields.length > 0){
        query += `WHERE `;
        for (let i = 0; i < searchFields.length; i++) {
            query += `${searchFields[i]} LIKE ?`
            if(i < searchFields.length-1){
                query += `OR `
            }
            
        }
    }

    //search parameters
    const searchParam = searchFields.map(()=>`%${searchBy}%`);

    const [count] = await db.promise().query(query, [...searchParam]);
    return count[0].totalCount;
}