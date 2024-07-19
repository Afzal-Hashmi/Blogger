const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdby: {
      type: Schema.Types.ObjectId,
      ref: "blogUser",
    },
    coverImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = model("userblog", blogSchema);

module.exports = Blog;
