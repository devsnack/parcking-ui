import React from "react";
import Link from "next/link";
export default function CLink({ href, children }) {
  return (
    <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
      {children}
    </Link>
  );
}
