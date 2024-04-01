import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    tags: [{
      type: String
    }]
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  export default Post;
