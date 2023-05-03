import mongoose from 'mongoose';

async function connect() {
    const mongodb = 'mongodb+srv://admin:admin123@cluster.n23pcd3.mongodb.net/product?retryWrites=true&w=majority'
    const connect = await mongoose.connect(mongodb, {autoIndex: true, useNewUrlParser: true});
    console.log("Connected to databased");

    return connect;
}

export default connect;
