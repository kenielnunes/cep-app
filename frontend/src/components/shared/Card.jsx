import React from "react";
import { cva } from "class-variance-authority";

const cardStyles = cva(
  "bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden transition-all duration-300",
  {
    variants: {
      hover: {
        true: "hover:shadow-lg",
      },
    },
  }
);

const Card = ({ children, hover = true }) => {
  return <div className={cardStyles({ hover })}>{children}</div>;
};

export default Card;
