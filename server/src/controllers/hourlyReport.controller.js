import { HourlyReport } from "../models/HourlyReport.models.js";
import { TimeSlot } from "../models/TimeSlot.models.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import customError from "../utils/CustomError.js";

export const getHourlyReport = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id 
    
    const data = await HourlyReport.find({ userId }).populate('time_slots').populate('worker')

    res.status(200).json({
        message : "successfull",
        data : data
    })
})

export const getHourlyReportbyTaskId = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const data = await HourlyReport.find({ task_id : id }).populate([
        {path : 'worker'},
        {
            path : 'time_slots',
            populate: {
                path: 'issue', 
            },
        }
    ])
  
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No hourly reports found for task ID: ${id}`,
      });
    }
  
    return res.status(200).json({
      success: true,
      data ,
    });
});

export const postHourlyReport = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id;

    const report = new HourlyReport({ ...req.body, userId });
    let data = await report.save(); // returns a real Mongoose document

    data = await data
    .populate([
        {
            path : 'time_slots',
            populate: {
                path: 'issue', 
            },
        },
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })
})

// export const updateHourlyReport = asyncErrorHandler(async (req , res , next )=>{
//     const id =  req.params.id 

//     // if(!req.body.garmentName || !req.body.style || !req.body.orderQuantity || !req.body.color ){
//     //     const err = new customError('All fields are require' , 404)
//     //     return next(err)
//     // }
    
//     const data =await HourlyReport.findByIdAndUpdate(id , {...req.body},{new : true})

//     if(!data){
//         const err = new customError('Data not found' , 404)
//         return next(err)
//     }

//     res.status(200).json({
//         message : 'successfull',
//         data  : data 
//     })
// })

export const updateHourlyReport = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id; // HourlyReport ID
    const { timeSlotId, qty_done , issue , ...rest } = req.body;
  
    // 1. Update TimeSlot first
    if (timeSlotId && qty_done !== undefined) {
      await TimeSlot.findByIdAndUpdate(timeSlotId, { qty_done , issue : issue}, { new: true });
    }
  
    // 2. Update HourlyReport (push the timeSlotId if it's not already in array)
    const data = await HourlyReport.findByIdAndUpdate(
      id,
      {
        ...rest,
        ...(timeSlotId && { $addToSet: { time_slots: timeSlotId } }), // avoid duplicates
      },
      { new: true }
    );
  
    if (!data) {
      return next(new customError('Data not found', 404));
    }
    // data = await data.populate('time_slots').populate('worker');
    
    res.status(200).json({
      message: 'successful',
      data,
    });
  });

export const deleteHourlyReport = asyncErrorHandler(async (req , res , next )=>{
    const id =  req.params.id 
    
    const data = await HourlyReport.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})