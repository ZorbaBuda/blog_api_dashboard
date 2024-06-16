import {Schema, model, models, Document, Model} from 'mongoose'

export interface IUser {
    email: string,
    username: string,
    password: string,
    role: string,
    logoUrl? : string
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema<IUserDocument>(
    {
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String,  default: () => "ADMIN"} ,
        logoUrl: {type: String}
    },
    {
        timestamps: true
    } 
)

const User: Model<IUserDocument> = models.User || model("User", UserSchema)

export default User
