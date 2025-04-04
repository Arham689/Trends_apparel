import { Department } from "../models/department.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getDepartment =  asyncErrorHandler(async (req , res , next )=>{

    const departmentData = await Department.find({})
    
    if(!departmentData){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successful',
        data : {
            departmentData
        }
    })
})

export const postDepartment = asyncErrorHandler(async (req , res , next) =>{

    const data = await Department.create(req.body);

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(201).json(
        {
            message : 'successful',
            id : data._id
        }
    )
})

export const updateDepartment = asyncErrorHandler(async (req, res , next ) => {
    const id = req.params.id
    if(!req.body.DepartmentName || !req.body.status){

        const err = new customError('Data not found' , 404 )
        return next(err)
    
    }

    const data = await Department.findByIdAndUpdate(id , {
        DepartmentName : req.body.DepartmentName,
        status : req.body.status
    } , {new : true })
    
    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "Data updated ",
        data : data
    })
})

export const deleteDepartment = asyncErrorHandler(async (req , res , next ) =>{
    const id = req.params.id 

    const data = await Department.findOneAndDelete({
        _id : id 
    })

    if(!data){
        const err = new customError('Data not found' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : "successfull"
    })
})