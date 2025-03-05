import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto w-full h-full mt-32 sm:mt-20">
      {children}
    </div>
  );
}

export default PageContainer;
