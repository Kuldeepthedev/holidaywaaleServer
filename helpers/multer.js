const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { days } = req.body;
    const dayDirectories = [];

    const daysArray = Array.isArray(days) ? days : [days];

    daysArray.forEach(dayId => {
      const dir = `./uploads/${dayId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      dayDirectories.push(dir);
    });

    cb(null, dayDirectories);
  },
  filename: (req, file, cb) => {
    const { days } = req.body;
    const { originalname } = file;
    let dayId;
    if (Array.isArray(days)) {
      dayId = days[req.files.length];
    } else {
      dayId = days;
    }

    const fileName = `Day-${dayId}-${Date.now()}-${originalname}`;
    cb(null, fileName);
  }
});