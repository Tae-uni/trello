import { ReactNode } from "react";

// and if put the bracket in folder, it can be use as a router. Plus, you can't access through the URL.
// This layout.tsx helps make the page consistent, including elements like the footer and header.
const TestLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="h-full">
      <div>
        This is a navbar
      </div>
      <hr />
      {children}
    </div>
  );
};

export default TestLayout;