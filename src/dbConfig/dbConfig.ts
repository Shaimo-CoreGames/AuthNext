import mongoose from "mongoose";

export async function connect() {

    try {
        // await mongoose.connect(process.env.MONGO_URI as string) // string for type safety (ensure string is passed)
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('Connected to your Db successfully')
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Mongoose connected to DB')
        })

        connection.on('error', (err) => {
            console.log('Mongoose connection error: ' + err);
            process.exit() 

        })



    }
    catch (error) {
        console.log('Something went wrong while connecting with your Db')
        console.log(error)
    }
}