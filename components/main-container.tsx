import type { ReactNode } from "react";

type MainContainerProps = {
  children: ReactNode;
};

/** Centers content and applies responsive horizontal padding for all breakpoints. */
export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      {children}
    </div>
  );
}
