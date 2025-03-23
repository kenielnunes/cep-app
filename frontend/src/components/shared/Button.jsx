import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "relative overflow-hidden font-medium rounded-lg px-5 py-3 transition-all shadow-md before:content-[''] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed before:bg-gradient-to-r before:from-primary-dark before:to-primary-darker hover:before:opacity-100",
        secondary:
          "bg-white text-primary border-2 border-secondary hover:border-secondary-border disabled:opacity-70 disabled:cursor-not-allowed before:bg-gradient-to-r before:from-secondary before:to-secondary-light hover:before:opacity-100",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Button = ({ variant = "primary", children, ...props }) => {
  return (
    <button className={buttonVariants({ variant })} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};
