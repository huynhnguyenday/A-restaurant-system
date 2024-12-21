import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
    <footer
      className="font-josefin-sans bg-white text-black"
      style={{ height: "250px" }}
    >
      <div className="mx-auto w-full px-6 pt-8">
        <div className="mx-auto max-w-full lg:w-[1200px]" ref={ref}>
          <div className="flex flex-wrap items-start justify-between">
            {/* Left Section */}
            <motion.div
              className="mb-6 w-full sm:mb-0 sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              variants={itemVariants}
            >
              <h2 className="mb-4 font-oswald text-4xl font-bold">
                BAMOS<span className="text-[#C63402]">COFFEE</span>
              </h2>
              <p className="font-josefin text-base leading-relaxed">
                Bamos định vị sẽ là thương hiệu cafe hoạt động 24/7 với không
                gian sân vườn rộng rãi kết hợp cùng đa dạng các hoạt động phù
                hợp cho cả các bạn trẻ, sinh viên cũng như là nơi tụ tập cuối
                tuần cho gia đình, nhóm bạn.
              </p>
            </motion.div>

            {/* Center Section */}
            <motion.div
              className="mb-6 w-full text-center sm:mb-0 sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={itemVariants}
            >
              <h2 className="underline-title mb-4 text-3xl font-bold text-[#633c02]">
                Về chúng tôi
              </h2>
              <div className="mx-auto my-4  h-1 w-12 bg-[#633c02]"></div>
              <ul className="fw-semibold space-y-2 font-josefin text-xl">
                <motion.li variants={itemVariants} custom={2}>
                  <a
                    href="/menu"
                    className="transition-colors hover:text-[#d88453]"
                  >
                    Thực đơn
                  </a>
                </motion.li>
                <motion.li variants={itemVariants} custom={3}>
                  <a
                    href="/news"
                    className="transition-colors hover:text-[#d88453]"
                  >
                    Tin tức
                  </a>
                </motion.li>
                <motion.li variants={itemVariants} custom={4}>
                  <a
                    href="/address"
                    className="transition-colors hover:text-[#d88453]"
                  >
                    Địa chỉ
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="w-full text-right sm:w-1/3"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={5}
              variants={itemVariants}
            >
              <h2
                className="mb-4 text-3xl font-bold text-[#633c02] pr-24 sm:pr-24"
              >
                Liên hệ
              </h2>
              <div className="mb-4 flex justify-center space-x-4 sm:justify-end">
                {[
                  { icon: faFacebook, link: "https://facebook.com" },
                  { icon: faInstagram, link: "https://instagram.com" },
                  { icon: faTwitter, link: "https://twitter.com" },
                  { icon: faTiktok, link: "https://tiktok.com" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    className="group relative inline-block"
                    variants={itemVariants}
                    custom={6 + index}
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-100 text-2xl text-black transition-transform duration-300 ease-in-out hover:scale-110 hover:text-[#d88453]"
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                    <span className="absolute bottom-[125%] left-1/2 hidden w-[120px] -translate-x-1/2 rounded bg-gray-800 p-2 text-center text-base text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
                      Follow on {social.icon.iconName}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="pb-6 pt-14 font-josefin text-base font-bold text-black"
                variants={itemVariants}
                custom={10}
              >
                © 2024 BAMOS
                <span className="text-[#C63402]">COFFEE</span>. Designer by
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
