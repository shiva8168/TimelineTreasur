import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'picture'
    });
    gfs = grid(conn.db, mongoose.mongo); 
    gfs.collection('picture');
});


export const uploadImage = (request, response) => {
    try {
        if (!request.file) 
        return response.status(404).json("File not found");

    const imageUrl = `${url}/file/${request.file.filename}`;
    // const writeStream = gridfsBucket.openUploadStream(request.file.filename);
    
    // writeStream.on('error', (error) => {
    //     console.error(error);
    //     response.status(500).json({ msg: error.message });
    // });

    // writeStream.on('finish', () => {
    //     response.status(200).json(imageUrl);
    // });

    // fs.createReadStream(request.file.path).pipe(writeStream);
    console.log(imageUrl)
    return response.status(200).json(imageUrl);
    } catch (error) {
        console.log(error.message)
    }
    
};


export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
} 