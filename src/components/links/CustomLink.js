import React from "react";
import { Link } from "@material-ui/core";

export default function CustomLink(props) {
  const { href, target, rel, children } = props;
  return (
    <Link
      href={href}
      target={target || "_blank"}
      rel={rel || "noopener noreferrer"}
    >
      {children}
    </Link>
  );
}
