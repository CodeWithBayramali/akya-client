
import Layout from "@/components/admin/Layout";

import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
        <Layout>{children}</Layout>
  );
}
