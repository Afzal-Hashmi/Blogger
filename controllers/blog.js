const Blog = require("../models/blog");

async function handleAddBlog(req, res) {
  const { title, body } = req.body;
  try {
    const coverImage = req.file ? `/images/uploads/${req.file.filename}` : null;
    const blog = await Blog.create({
      title,
      content: body,
      createdby: req.user._id,
      coverImage: coverImage, // req.file.path for local storage.
    });
    res.status(200).redirect("/");
  } catch (error) {
    res
      .status(400)
      .render("addBlog", { user: req.user, error: "All fields are required" });
  }
}
async function handleBlogDisplaybyId(req, res) {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById({ _id: blogId }).populate("createdby");
    return res.render("blog", { user: req.user, blog: blog });
  } catch (error) {
    return res.status(404).redirect("/");
  }
}
async function handleDeleteBlogById(req, res) {
  const blogId = req.params.id;
  try {
    await Blog.findByIdAndDelete({ _id: blogId });
    const allblogs = await Blog.find({});
    return res.status(200).render("home", {
      deleted: "Blog deleted successfully",
      allblogs: allblogs,
      user: req.user,
    });
  } catch (error) {
    return res.status(404).redirect("/");
  }
}

module.exports = {
  handleAddBlog,
  handleBlogDisplaybyId,
  handleDeleteBlogById,
};
