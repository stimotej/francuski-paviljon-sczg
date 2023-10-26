import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div className={clsx("px-6 sm:px-8 md:px-12", props.className)}>
      {props.children}
    </div>
  );
};

export default Container;
