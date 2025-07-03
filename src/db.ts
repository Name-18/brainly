import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema(
    {
        username : {type : String , unique:true ,required:true },
        password :{ type:String ,required:true}
    }
)

const tag = new Schema(
    {
        title : {
            type :String, required:true,unique:true
        }
    }
)

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


 export const User = mongoose.model('User',userSchema);
 export const Tag = mongoose.model('Tag',tag);
 export  const Content = mongoose.model('Content',contentSchema);
 export const Link = model('Link',linkSchema);
