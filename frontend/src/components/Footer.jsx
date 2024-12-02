import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
    }),
  };

  return (
    <footer className="footer bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="flex flex-wrap justify-between items-start">
          {/* Phần bên trái */}
          <motion.div
            className="w-full sm:w-1/3 mb-6 sm:mb-0"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            variants={itemVariants}
          >
            <h2 className="text-lg font-bold mb-4">
              BAMOS<span className="red">COFFEE</span>
            </h2>
            <p className="text-sm leading-relaxed introduce">
              Bamos định vị sẽ là thương hiệu cafe hoạt động 24/7 với không gian sân vườn rộng rãi kết hợp cùng đa dạng các
              hoạt động phù hợp cho cả các bạn trẻ, sinh viên cũng như là nơi tụ tập cuối tuần cho gia đình, nhóm bạn.
            </p>
          </motion.div>

          {/* Phần ở giữa */}
          <motion.div
            className="w-full sm:w-1/3 mb-6 sm:mb-0 text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            variants={itemVariants}
          >
            <h2 className="text-lg font-bold mb-4 underline-title">Về chúng tôi</h2>
            <ul className="space-y-2 text-sm">
              <motion.li variants={itemVariants} custom={2}>
                <a href="/menu" className="hover:underline">
                  Thực đơn
                </a>
              </motion.li>
              <motion.li variants={itemVariants} custom={3}>
                <a href="/news" className="hover:underline">
                  Tin tức
                </a>
              </motion.li>
              <motion.li variants={itemVariants} custom={4}>
                <a href="/address" className="hover:underline">
                  Địa chỉ
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Phần bên phải */}
          <motion.div
            className="w-full sm:w-1/3 text-right"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={5}
            variants={itemVariants}
          >
            <h2 className="text-lg font-bold mb-4 lienhe">Liên hệ</h2>
            <div className="flex justify-end space-x-4 mb-4">
              {[
                { icon: faFacebook, link: "https://facebook.com" },
                { icon: faInstagram, link: "https://instagram.com" },
                { icon: faTwitter, link: "https://twitter.com" },
                { icon: faTiktok, link: "https://tiktok.com" },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  className="tooltip"
                  variants={itemVariants}
                  custom={6 + index}
                >
                  <a href={social.link} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                  <span className="tooltiptext">Follow on {social.icon.iconName}</span>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-xs text-gray-400 codeby"
              variants={itemVariants}
              custom={10}
            >
              © 2024 BAMOS<span className="red">COFFEE</span>. Designer by Group 1
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
