const router = require("express").Router();
const {
  handleAddBlog,
  handleBlogDisplaybyId,
  handleDeleteBlogById,
} = require("../controllers/blog");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("coverImage"), handleAddBlog);

router.get("/add-blog", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/:id", handleBlogDisplaybyId);

router.get("/delete/:id", handleDeleteBlogById);

module.exports = router;
