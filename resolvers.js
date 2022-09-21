const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, world!";
    },
    getAllPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
    getPost: async (parents, args, context, info) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parents, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parents, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Ok, post deleted";
    },
    updatePost: async (parents, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
  },
};

module.exports = resolvers;
