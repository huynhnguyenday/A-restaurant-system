import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PricingContentNew from "./PricingContentNew";
import PricingContentMenu from "./PricingContentMenu";

const NavbarLink = () => {
  return (
    <div>
      <ul className="navbar-links flex">
        <li>
          <FlyoutLink href="/home">TRANG CHỦ</FlyoutLink>
        </li>
        <li>
          <FlyoutLink href="/menu" FlyoutContent={PricingContentMenu}>
            THỰC ĐƠN
          </FlyoutLink>
        </li>
        <li>
          <FlyoutLinkNews href="/news" FlyoutContent={PricingContentNew}>
            TIN TỨC
          </FlyoutLinkNews>
        </li>
        <li>
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
      <a href={href} className="relative text-white">
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
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[62px] w-[1200px] rounded-3xl bg-white text-black shadow-lg"
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
      <a href={href} className="relative text-white">
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
            style={{ translateX: "calc(-50% - 140px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[62px] w-[1200px] rounded-3xl bg-white text-black shadow-lg"
          >
            <FlyoutContent closeFlyout={closeFlyout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default NavbarLink;
