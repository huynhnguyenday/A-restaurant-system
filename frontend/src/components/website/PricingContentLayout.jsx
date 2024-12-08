import React from "react";

const PricingContentLayout = ({ children }) => {
  return (
    <div className="absolute left-1/2 top-[100px] w-[1200px] -translate-x-1/2 rounded-3xl border-2 border-orange-900 bg-white p-6 shadow-xl">
      {children}
    </div>
  );
};

export default PricingContentLayout;
