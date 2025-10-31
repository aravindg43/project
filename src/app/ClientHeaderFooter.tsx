"use client";
import React from "react";
import dynamic from "next/dynamic";

const BCBSMSHeader = dynamic(
  () => import("@bcbsms/component-library").then((mod) => mod.BCBSMSHeader),
  { ssr: false }
);
const BCBSMSFooter = dynamic(
  () => import("@bcbsms/component-library").then((mod) => mod.BCBSMSFooter),
  { ssr: false }
);

export default function ClientHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BCBSMSHeader />
      <main>{children}</main>
      <BCBSMSFooter />
    </>
  );
}
