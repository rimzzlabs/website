import React, { type PropsWithChildren } from "react";
import { Button, type ButtonProps } from "./button";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonProps;

export const Link = ({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
};
