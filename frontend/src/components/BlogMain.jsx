import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./BlogMain.css";

import imgblog1 from "../assets/imgblog1.png";
import imgblog2 from "../assets/imgblog2.png";
import imgblog3 from "../assets/imgblog3.png";

export const blogs = [ // Export blogs
  {
    id: 1,
    title: "Here are the trends I see coming this fall",
    date: "27/04/2024",
    image: imgblog1,
    content: "Detailed content for blog 1. Here is where the full article will be displayed.",
  },
  {
    id: 2,
    title: "The ultimate guide to your autumn wardrobe",
    date: "25/02/2024",
    image: imgblog2,
    content: "Detailed content for blog 2. Here's everything you need to know about autumn wardrobes.",
  },
  {
    id: 3,
    title: "Top 5 destinations for this winter vacation",
    date: "27/02/2024",
    image: imgblog3,
    content: "Detailed content for blog 3. Explore the best destinations for your winter vacation!",
  },
];

const BlogMain = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.4 },
    }),
  };

  return (
    <div className="blogs">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="section_title">
              <h2>Tin mới nóng hổi</h2>
              <div className="divider"></div>
            </div>
          </div>
        </div>
        <div className="row blogs_container" ref={ref}>
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              className="col-lg-4 blog_item_col"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={index}
              variants={cardVariants}
            >
              <div className="blog_item">
                <img src={blog.image} alt={blog.title} />
                <div className="blog_content_overlay">
                  <h4 className="blog_title">{blog.title}</h4>
                  <span className="blog_meta">
                   {blog.date}
                  </span>
                  <Link className="blog_more" to={`/blogs/${blog.id}`}> 
                    Đọc Thêm
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogMain;
