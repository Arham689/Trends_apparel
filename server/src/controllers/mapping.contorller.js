import { Mapping } from "../models/mapping.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";


export const getMapping = asyncErrorHandler(async (req ,res , next )=>{
    const user_id = req.user._id 

    const data = await Mapping.find({userId : user_id})
    .populate([
        {path : 'tidno'},
        {path : 'style'},
        {path : 'garment'},
        {path : 'operations'},
    ])

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const getMappingWithId = asyncErrorHandler(async (req , res, next )=>{
    const id = req.params.id 
    const user_id = req.user._id 

    const data = await Mapping.findById({_id:id})
    .populate([
        {path : 'tidno'},
        {path : 'style'},
        {path : 'garment'},
        {path : 'operations'},
    ])

    res.status(200).json({
        message : 'successfull',
        data : data 
    })

})
export const postMapping = asyncErrorHandler(async (req ,res , next )=>{

    const userId = req.user._id;

    const mapping = new Mapping({ ...req.body,  userId });
    let data = await mapping.save(); // returns a real Mongoose document

    data = await data
    .populate([
        {path : 'tidno'},
        {path : 'style'},
        {path : 'garment'},
        {path : 'operations'},
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })

})
export const updateMapping = asyncErrorHandler(async (req ,res , next )=>{

    const userId = req.user._id;

    const id =  req.params.id 

    const data =await Mapping.findByIdAndUpdate(id , {
        ...req.body 
    },{new : true})
    .populate('tidno')
    .populate('style')
    .populate('garment')
    .populate('operations')
    
    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }   
    
    res.status(200).json({
        message : 'successfull',
        data  : data 
    })


})

export const deleteMapping = asyncErrorHandler(async (req ,res , next )=>{

    const id =  req.params.id 
    
    const data = await Mapping.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })

})