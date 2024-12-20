import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PricingContentNew from "./PricingContentNew";
import PricingContentMenu from "./PricingContentMenu";

const NavbarLink = () => {
  return (
    <div className="w-full">
      <ul className="navbar-links flex flex-col items-start justify-center sm:flex-row sm:space-x-8 sm:space-y-0 sm:pl-8">
        <li className="w-full border-t-[1px] border-gray-300 py-4 sm:w-max sm:border-none sm:py-0">
          <FlyoutLink href="/home">TRANG CHỦ</FlyoutLink>
        </li>
        <li className="w-full border-b-[1px] border-t-[1px] border-gray-300 py-4 sm:w-max sm:border-none sm:py-0">
          <FlyoutLink href="/menu" FlyoutContent={PricingContentMenu}>
            THỰC ĐƠN
          </FlyoutLink>
        </li>
        <li className="w-full border-b-[1px] border-gray-300 py-4 sm:w-max sm:border-none sm:py-0">
          <FlyoutLinkNews href="/news" FlyoutContent={PricingContentNew}>
            TIN TỨC
          </FlyoutLinkNews>
        </li>
        <li className="w-full border-b-[1px] border-gray-300 py-4 sm:w-max sm:border-none sm:py-0">
          <FlyoutLink href="/address">ĐỊA CHỈ</FlyoutLink>
        </li>
      </ul>
    </div>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;

  const closeFlyout = () => setOpen(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <a
        href={href}
        className="inline px-8 font-oswald font-semibold text-black transition-colors duration-300 hover:text-[#d88453]"
      >
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-45%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[58px] w-[1200px] rounded-3xl bg-white text-black shadow-lg"
          >
            <FlyoutContent closeFlyout={closeFlyout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlyoutLinkNews = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;

  const closeFlyout = () => setOpen(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <a
        href={href}
        className="inline px-8 font-oswald font-semibold text-black transition-colors duration-300 hover:text-[#d88453]"
      >
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "calc(-48% - 140px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[58px] w-[1200px] rounded-3xl bg-white text-black shadow-lg"
          >
            <FlyoutContent closeFlyout={closeFlyout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarLink;
