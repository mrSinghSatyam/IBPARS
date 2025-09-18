import Report from '../Models/reportModel.js'; // Add .js extension for local files

export const submitReport = async (req, res) => {
  try {
    // Create a new report using data from request body
    const newReport = new Report(req.body);

    // Save the report to the database
    await newReport.save();

    // Send a successful response with the report data (for feedback)
    res.status(201).json({
      message: 'Report submitted successfully',
      report: newReport,  // Return the newly created report
    });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to submit report' });
  }
};

export const getReports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Default to page 1, 10 items per page
  try {
    // Paginate reports
    const reports = await Report.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Count the total number of reports
    const totalReports = await Report.countDocuments();

    res.status(200).json({
      totalReports,
      reports,
      totalPages: Math.ceil(totalReports / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};
