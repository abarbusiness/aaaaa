import * as React from "react";

const Button = React.forwardRef(function Button({ className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-orange-500 text-white hover:bg-orange-600 " + className}
      {...props}
    />
  );
});

export { Button };
