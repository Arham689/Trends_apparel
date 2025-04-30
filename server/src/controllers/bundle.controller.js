import { Bundle } from '../models/bundel.models.js'
import { HourlyReport } from '../models/HourlyReport.models.js'
import { TimeSlot } from '../models/TimeSlot.models.js'
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

export const deleteBundle = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;

  const bundle = await Bundle.findByIdAndDelete(id);

  if (!bundle) {
    return next(new customError('Bundle not found', 404));
  }

  const task_id = bundle.task_id;

  if (!task_id) {
    return next(new customError('task_id missing from bundle', 500));
  }

  const otherBundlesExist = await Bundle.exists({ task_id });

  if (!otherBundlesExist) {
    // No other bundles → safe to delete associated hourly reports and time slots
    const reports = await HourlyReport.find({ task_id });
    const allTimeSlotIds = reports.flatMap(r => r.time_slots || []);

    await TimeSlot.deleteMany({ _id: { $in: allTimeSlotIds } });
    await HourlyReport.deleteMany({ task_id });
  }

  res.status(200).json({
    message: 'Bundle deleted successfully',
    relatedDataDeleted: !otherBundlesExist
  });
});


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

/**
 *data = {
  bundleName: 'Y01',
  bundle_operations: [
    {
      _id: '67f65e2838fa7da31c4f24f8',
      userId: '67f366ec1074cbfd05bee97b',
      operationName: 'operation 1',
      description: 'NA',
      rate: 3,
      unitType: '67f65dd638fa7da31c4f24c2',
      department: '67f36a476254d1558eee5713',
      style: '67f4fa014be1ee15baf6a307',
      garment: '67f626c3aaaf4c191df0e070',
      sam: 0.4,
      tgtPerHour: 9,
      tgtPerDay: 5,
      createdAt: '2025-04-09T11:46:48.097Z',
      updatedAt: '2025-04-09T11:46:48.097Z',
      __v: 0
    },
    {
      _id: '67f8dae6ddd9efca9d46520b',
      userId: '67f366ec1074cbfd05bee97b',
      operationName: 'OPERATION2',
      description: 'NA',
      rate: 2,
      unitType: '67f65dd638fa7da31c4f24c2',
      department: '67f36a476254d1558eee5713',
      style: '67f4f7e44be1ee15baf6a2ba',
      garment: '67f618ecaaaf4c191df0de36',
      sam: 1,
      tgtPerHour: 60,
      tgtPerDay: 420,
      createdAt: '2025-04-11T09:03:34.213Z',
      updatedAt: '2025-04-11T09:03:34.213Z',
      __v: 0
    },
    {
      _id: '67fa9d3e06070eeb40695942',
      userId: '67f366ec1074cbfd05bee97b',
      operationName: 'Stitching',
      description: 'NA',
      rate: 9,
      unitType: '67f65dd638fa7da31c4f24c2',
      department: '67f366f81074cbfd05bee984',
      style: '67f4fb514be1ee15baf6a338',
      garment: '67f626c3aaaf4c191df0e070',
      sam: 1,
      tgtPerHour: 60,
      tgtPerDay: 420,
      createdAt: '2025-04-12T17:05:02.182Z',
      updatedAt: '2025-04-12T17:05:02.182Z',
      __v: 0
    }
  ],
  color: '67f50357f9c9eae8ce7c922d',
  garment: '6800ab19db4cf6253d4b5a0f',
  production_date: '2025-04-25',
  section_id: '67f36b314d3df2341c738262',
  serial_start: 1,
  serial_end: 1,
  size: '67f50fa32e16efac9d721580',
  style: '67f4f7e44be1ee15baf6a2ba',
  supervisor_id: '67ff43fc58fbc3ae1d451411',
  Tidno: '67f380e6a06d2cb833e23c5a',
  line_id: '67f36b2b4d3df2341c73825c',
  status: 0
}
***********************************************************************************************************************************************************************
[
  {
    bundleName: 'Y06',
    bundle_operations: [ [Object], [Object], [Object], [Object] ],
    color: '67f50357f9c9eae8ce7c922d',
    garment: '67f626c3aaaf4c191df0e070',
    production_date: '2025-04-25',
    section_id: '67f36b314d3df2341c738262',
    serial_start: 141,
    serial_end: 170,
    size: '67f50fa72e16efac9d721583',
    style: '67f4fb514be1ee15baf6a338',
    supervisor_id: '67ff43fc58fbc3ae1d451411',
    Tidno: '67f4c787e66b14e4f3697242',
    line_id: '67f36b2b4d3df2341c73825c',
    status: 0
  },
  {
    bundleName: 'Y07',
    bundle_operations: [ [Object], [Object], [Object], [Object] ],
    color: '67f50357f9c9eae8ce7c922d',
    garment: '67f626c3aaaf4c191df0e070',
    production_date: '2025-04-25',
    section_id: '67f36b314d3df2341c738262',
    serial_start: 171,
    serial_end: 200,
    size: '67f50fa72e16efac9d721583',
    style: '67f4fb514be1ee15baf6a338',
    supervisor_id: '67ff43fc58fbc3ae1d451411',
    Tidno: '67f4c787e66b14e4f3697242',
    line_id: '67f36b2b4d3df2341c73825c',
    status: 0
  },
  {
    bundleName: 'Y08',
    bundle_operations: [ [Object], [Object], [Object], [Object] ],
    color: '67f50357f9c9eae8ce7c922d',
    garment: '67f626c3aaaf4c191df0e070',
    production_date: '2025-04-25',
    section_id: '67f36b314d3df2341c738262',
    serial_start: 201,
    serial_end: 230,
    size: '67f50fa72e16efac9d721583',
    style: '67f4fb514be1ee15baf6a338',
    supervisor_id: '67ff43fc58fbc3ae1d451411',
    Tidno: '67f4c787e66b14e4f3697242',
    line_id: '67f36b2b4d3df2341c73825c',
    status: 0
  },
  {
    bundleName: 'Y09',
    bundle_operations: [ [Object], [Object], [Object], [Object] ],
    color: '67f50357f9c9eae8ce7c922d',
    garment: '67f626c3aaaf4c191df0e070',
    production_date: '2025-04-25',
    section_id: '67f36b314d3df2341c738262',
    serial_start: 231,
    serial_end: 260,
    size: '67f50fa72e16efac9d721583',
    style: '67f4fb514be1ee15baf6a338',
    supervisor_id: '67ff43fc58fbc3ae1d451411',
    Tidno: '67f4c787e66b14e4f3697242',
    line_id: '67f36b2b4d3df2341c73825c',
    status: 0
  },
  {
    bundleName: 'Y10',
    bundle_operations: [ [Object], [Object], [Object], [Object] ],
    color: '67f50357f9c9eae8ce7c922d',
    garment: '67f626c3aaaf4c191df0e070',
    production_date: '2025-04-25',
    section_id: '67f36b314d3df2341c738262',
    serial_start: 261,
    serial_end: 280,
    size: '67f50fa72e16efac9d721583',
    style: '67f4fb514be1ee15baf6a338',
    supervisor_id: '67ff43fc58fbc3ae1d451411',
    Tidno: '67f4c787e66b14e4f3697242',
    line_id: '67f36b2b4d3df2341c73825c',
    status: 0
  }
]

*/

export const postBulkBundle = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;
  const userId = req.user._id;
  const slot = ['10:00', '11:00', '12:00', '01:00', '02:30', '03:30', '04:30', '06:00'];

  const bundle_operations = data[0].bundle_operations || [];
  const styleId = data[0]?.style.slice(-3);
  const garmentId = data[0]?.garment.slice(-3);
  const rawString = `${styleId}=${garmentId}=${data[0]?.production_date}`;
  const encoded = btoa(rawString);

  const operations = data.map(bundle => ({
    insertOne: {
      document: { ...bundle, userId  , task_id: encoded}
    }
  }));

  const result = await Bundle.bulkWrite(operations);

  // Map each operation to a promise of hourly report
  const hourlyReportPromises = bundle_operations.map(async (op) => {
    const timeSlotDocs = slot.map(slot_time => ({
      userId,
      slot_time,
      task_id: encoded,
      production_date: data[0]?.production_date,
      status: '0',
      qty_done: 0
    }));

    const insertedSlots = await TimeSlot.insertMany(timeSlotDocs);
    const time_slots = insertedSlots.map(doc => doc._id);

    return {
      operation_id: op._id,
      operationName: op.operationName,
      production_date: data[0]?.production_date,
      task_id: encoded,
      time_slots,
      userId
    };
  });

  const hourlyReports = await Promise.all(hourlyReportPromises);

  await HourlyReport.bulkWrite(
    hourlyReports.map(report => ({
      insertOne: { document: report }
    }))
  );

  res.status(201).json({
    message: 'Bundles inserted successfully',
    result
  });
});


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
  //TODO : also send the Task_id (garment , style , DATE )
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
  const bundlesWithTaskId = groupedBundles.map(bundle => {
    const formattedDate = new Date(bundle.production_date).toISOString().slice(0, 10);
    const styleId = bundle.styleId.toString().slice(-3);
    const garmentId = bundle.garmentId.toString().slice(-3);
  
    const rawString = `${styleId}=${garmentId}=${formattedDate}`;
    const encoded = Buffer.from(rawString).toString('base64'); // or btoa(rawString) if in browser
  
    return {
      ...bundle,
      taskId: encoded
    };
  });
  
  res.status(200).json({
    message: "successful",
    data: {
      groupedBundles : bundlesWithTaskId
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

