import { Schema, model, Model, Document, models } from 'mongoose';

export interface IBlogView {
    visitorId: string,
    viewport: string,
    blogId: string,
    userId?: string
}

export interface IBlogViewDocument extends IBlogView, Document {
    createdAt: Date,
    updatedAt: Date
}

const BlogViewSchema = new Schema<IBlogViewDocument>(
    {
        visitorId : { type : String},
        viewport : { type : String },
        blogId : { type : String },
        userId: {type : String}
    },
    { 
        timestamps : true
    }
)

const BlogView: Model<IBlogViewDocument> = models.BlogView || model("BlogView", BlogViewSchema)

export default BlogView;






// model BlogView {
//     id String @id @default(auto()) @map("_id") @db.ObjectId
  
//     visitorId String
//     viewport  String
  
//     blog   Blog   @relation(fields: [blogId], references: [id], onDelete: Cascade)
//     blogId String @db.ObjectId
  
//     user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
//     userId String @db.ObjectId
  
//     createdAt DateTime @default(now())
  
//     @@unique([blogId, visitorId])
//   }