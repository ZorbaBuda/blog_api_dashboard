import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log("Already connected");
        return;
    }

    if(connectionState === 2) {
        console.log("connecting...");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "next14restApi",
            bufferCommands: false
        })

        //for debug
        // mongoose.set('debug', true);

       // Set `strictQuery` to `true` to omit unknown fields in queries.
    //    mongoose.set('strictQuery', true); 
    
        console.log("Connected")
    } catch(error) {
        console.log("Error in connecting to database", error);
        throw new Error("error connecting to database")
    }
}

export default connect