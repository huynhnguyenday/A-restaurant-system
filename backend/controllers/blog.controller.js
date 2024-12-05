import Blog from "../models/blog.model.js";
import path from "path";

export const getBlogs = async (req, res) => {
  try {
    // Lấy tất cả blog từ database
    const blogs = await Blog.find();

    // Thêm đường dẫn đầy đủ cho ảnh
    const blogsWithFullImagePath = blogs.map((blog) => ({
      ...blog.toObject(),
      image: `http://localhost:5000/assets/${blog.image}`,
    }));

    res.status(200).json({
      success: true,
      data: blogsWithFullImagePath,
    });
  } catch (error) {
    console.error("Error in fetching blogs:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imagePath = `http://localhost:5000/uploads/${req.file.filename}`; // Đường dẫn ảnh

    const newBlog = new Blog({
      image: imagePath,
      title,
      content,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error("Error in creating blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Blog ID" });
  }

  try {
    // Kiểm tra sự tồn tại của Blog trước khi cập nhật
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Kiểm tra nếu có ảnh mới, tạo đường dẫn ảnh đầy đủ
    if (req.file) {
      blog.image = `http://localhost:5000/assets/${req.file.filename}`;
    }

    // Cập nhật blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

    // Trả về dữ liệu đã cập nhật, với đường dẫn ảnh đầy đủ
    res.status(200).json({
      success: true,
      data: {
        ...updatedBlog.toObject(),
        image: updatedBlog.image
          ? `http://localhost:5000/assets/${updatedBlog.image}`
          : null,
      },
    });
  } catch (error) {
    console.error("Error in updating blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Blog ID" });
  }

  try {
    // Tìm và xóa blog theo ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    // Nếu blog không tồn tại
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Trả về thông báo thành công sau khi xóa
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting blog:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
