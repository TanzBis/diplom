const multer = require("multer");
const path = require("path");

const pictureFieldNames = ['picture1', 'picture2', 'picture3', 'picture4'];
const audioFieldNames = ['audio1', 'audio2', 'audio3', 'audio4'];

const pictureMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
const audioMimeTypes = ['audio/mpeg', 'audio/mp3'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'picture') {
            cb(null, path.join(__dirname, 'uploads/themes/pictures'));
        } else if (pictureFieldNames.includes(file.fieldname)) {
            cb(null, path.join(__dirname, 'uploads/quizzes/pictures'));
        } else if (audioFieldNames.includes(file.fieldname)) {
            cb(null, path.join(__dirname, 'uploads/quizzes/audios'));
        } else {
            cb(null, path.join(__dirname, 'uploads'));
        }
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (pictureMimeTypes.includes(file.mimetype) || audioMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const limits = {
    // fileSize: 1024 * 1024 * 5
};

exports.upload = multer({storage, fileFilter, limits});