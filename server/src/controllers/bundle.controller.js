import { Bundle } from '../models/bundel.models.js'
import {asyncErrorHandler } from '../utils/asyncErrorHandler.js'
import  customError  from '../utils/CustomError.js'

export const getBundle = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id 
    
    const data = await Bundle.find({ userId }).populate([
        { path: 'bundle_operations', 
            populate: {
              path: 'department',
              model: 'Department'
            }  },
        { path: 'color' },
        { path: 'garment' },
        { path: 'line_id' },
        { path: 'section_id' },
        { path: 'size' },
        { path: 'style' },
        { path: 'supervisor_id' },
        { path: 'Tidno' },
    ]);

    res.status(200).json({
        message : "successfull",
        data : data
    })

})
export const postBundle = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id;

    const operation = new Bundle({ ...req.body, userId });
    let data = await operation.save(); // returns a real Mongoose document

    data = await data
    .populate([
        { path: 'bundle_operations' },
        { path: 'color' },
        { path: 'garment' },
        { path: 'line_id' },
        { path: 'section_id' },
        { path: 'size' },
        { path: 'style' },
        { path: 'supervisor_id' },
        { path: 'Tidno' },
    ])

    res.status(201).json({
        message : 'successfull',
        data
    })

})
export const updateBundle = asyncErrorHandler(async (req , res , next )=>{

    const id =  req.params.id 

    const requiredFields = [
        'userId',
        'bundleName',
        'bundle_operations',
        'color',
        'garment',
        'line_id',
        'production_date',
        'section_id',
        'serial_start',
        'serial_end',
        'size',
        'style',
        'supervisor_id',
        'Tidno'
      ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return next(new customError(`${field} is required`, 400));
        }
    }

    let data = await Bundle.findByIdAndUpdate(id, {
        ...req.body
    }, { new: true });
      
    data = await data.populate([
        { path: 'bundle_operations' },
        { path: 'color' },
        { path: 'garment' },
        { path: 'line_id' },
        { path: 'section_id' },
        { path: 'size' },
        { path: 'style' },
        { path: 'supervisor_id' },
        { path: 'Tidno' },
    ]);

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data  : data 
    })
})
export const deleteBundle = asyncErrorHandler(async (req , res , next )=>{

    const id =  req.params.id 
    
    const data = await Bundle.findByIdAndDelete(id)

    if(!data){
        const err = new customError('Data not found' , 404)
        return next(err)
    }
    
    res.status(200).json({
        message : 'Deleted'
    })
})

export const getBundleById = asyncErrorHandler(async (req, res, next )=>{
    const id = req.params.id

    const data = await Bundle.findOne({_id : id  }).populate([
        { path: 'bundle_operations' },
        { path: 'color' },
        { path: 'garment' },
        { path: 'line_id' },
        { path: 'section_id' },
        { path: 'size' },
        { path: 'style' },
        { path: 'supervisor_id' },
        { path: 'Tidno' },
    ]);

    if(!data)
    {
        const err = new customError('Data _id not found ' , 404 )
        return next(err)
    }

    res.status(200).json({
        message : 'successfull',
        data 
    })
})

export const postBulkBundle = asyncErrorHandler(async (req , res , next ) => {
    const data = req.body; // Array of bundles
    const userId = req.user._id

    const operations = data.map(bundle => ({
      insertOne: {
        document: {...bundle , userId }
      }
    }));

    const result = await Bundle.bulkWrite(operations);

    res.status(201).json({
      message: 'Bundles inserted successfully',
      result
    });

})

export const getBundleByTid = asyncErrorHandler(async (req , res , next )=>{
    const userId = req.user._id 
    const id = req.params.id 

    const data = await Bundle.find({ userId , Tidno : id })

    res.status(200).json({
        message : "successfull",
        data : data
    })

})

export const getGroupBundle = asyncErrorHandler(async (req, res, next) => {
  const groupedBundles = await Bundle.aggregate([
    { $sort: { serial_end : -1 } },
    {
      $group: {
        _id: {
          production_date: "$production_date",
          style: "$style",
          garment: "$garment"
        },
        count: { $sum: 1 },
        last_serial_start: { $first: "$serial_start" },
        last_serial_end: { $first: "$serial_end" },
        last_bundle_id: { $first: "$_id" },
        last_line: { $first: "$line_id" },
        last_section: { $first: "$section_id" },
        last_supervisor: { $first: "$supervisor_id" }
      }
    },
    // Lookup style
    {
      $lookup: {
        from: "styles",
        localField: "_id.style",
        foreignField: "_id",
        as: "style"
      }
    },
    { $unwind: "$style" },
    // Lookup garment
    {
      $lookup: {
        from: "garments",
        localField: "_id.garment",
        foreignField: "_id",
        as: "garment"
      }
    },
    { $unwind: "$garment" },
    // Lookup line
    {
      $lookup: {
        from: "lines",
        localField: "last_line",
        foreignField: "_id",
        as: "line"
      }
    },
    { $unwind: { path: "$line", preserveNullAndEmptyArrays: true } },
    // Lookup section
    {
      $lookup: {
        from: "sections",
        localField: "last_section",
        foreignField: "_id",
        as: "section"
      }
    },
    { $unwind: { path: "$section", preserveNullAndEmptyArrays: true } },
    // Lookup supervisor
    {
      $lookup: {
        from: "supervisors",
        localField: "last_supervisor",
        foreignField: "_id",
        as: "supervisor"
      }
    },
    { $unwind: { path: "$supervisor", preserveNullAndEmptyArrays: true } },
    // Final shape
    {
      $project: {
        _id: 0,
        production_date: "$_id.production_date",
        styleId: "$_id.style",
        styleName: "$style.styleName",
        garmentId: "$_id.garment",
        garmentName: "$garment.garmentName",
        count: 1,
        serial_start: "$last_serial_start",
        serial_end: "$last_serial_end",
        lineId: "$last_line",
        lineName: "$line.lineName",
        sectionId: "$last_section",
        sectionName: "$section.sectionName",
        supervisorId: "$last_supervisor",
        supervisorName: "$supervisor.supervisorName"
      }
    },
    { $sort: { production_date: -1 } }
  ]);

  res.status(200).json({
    message: "successful",
    data: {
      groupedBundles
    }
  });
});


export const updateGroupedBundles = asyncErrorHandler(async (req, res, next) => {
  const { garmentId, styleId, production_date, updateData } = req.body;

  if (!garmentId || !styleId || !production_date || !updateData) {
    return res.status(400).json({
      message: "Missing required fields: garmentId, styleId, production_date, updateData"
    });
  }

  const result = await Bundle.updateMany(
    {
      garment: garmentId,
      style: styleId,
      production_date: new Date(production_date)
    },
    {
      $set: updateData
    }
  );

  res.status(200).json({
    message: "Bundles updated successfully",
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount
  });
});

