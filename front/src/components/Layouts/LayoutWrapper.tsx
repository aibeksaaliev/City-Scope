import React, { PropsWithChildren } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useRouter } from "next/router";

const LayoutWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const query = useRouter();
  const authPaths = ['/auth', '/auth/login', '/auth/register'];
  const isAuthPage = authPaths.includes(query.pathname);

  if (isAuthPage) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default LayoutWrapper;
