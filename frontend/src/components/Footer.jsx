import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

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
    <footer className="footer bg-gray-900 py-10 text-white">
      {/* Container with width adjustments */}
      <div className="mx-auto w-full px-6">
        <div className="mx-auto max-w-full lg:w-[1200px]" ref={ref}>
          <div className="flex flex-wrap items-start justify-between">
            {/* Phần bên trái */}
            <motion.div
              className="mb-6 w-full sm:mb-0 sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              variants={itemVariants}
            >
              <h2 className="mb-4 text-lg font-bold">
                BAMOS<span className="red">COFFEE</span>
              </h2>
              <p className="introduce text-sm leading-relaxed">
                Bamos định vị sẽ là thương hiệu cafe hoạt động 24/7 với không
                gian sân vườn rộng rãi kết hợp cùng đa dạng các hoạt động phù
                hợp cho cả các bạn trẻ, sinh viên cũng như là nơi tụ tập cuối
                tuần cho gia đình, nhóm bạn.
              </p>
            </motion.div>

            {/* Phần ở giữa */}
            <motion.div
              className="mb-6 w-full text-center sm:mb-0 sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={itemVariants}
            >
              <h2 className="underline-title mb-4 text-lg font-bold">
                Về chúng tôi
              </h2>
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
              className="w-full text-right sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={5}
              variants={itemVariants}
            >
              <h2 className="lienhe mb-4 text-lg font-bold">Liên hệ</h2>
              <div className="mb-4 flex justify-center space-x-4 sm:justify-end">
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
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                    <span className="tooltiptext">
                      Follow on {social.icon.iconName}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="codeby text-xs text-gray-400"
                variants={itemVariants}
                custom={10}
              >
                © 2024 BAMOS<span className="red">COFFEE</span>. Designer by
                Group 1
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
