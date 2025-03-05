"use client";
import React from "react";
import SideBar from "@/components/admin/AdminSideBar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import {usePathname} from "next/navigation";
import { FaUserShield } from "react-icons/fa";
import { Toolbar } from "primereact/toolbar";

function Layout({ children }) {
  const path = usePathname();
  return (
    <div className={"flex flex-row"}>
      <SideBar />

      <div className={"flex flex-col w-full"}>
        <Toolbar
          className={"sticky w-full top-0 z-50 !rounded-none"}
          style={{ paddingRight: 35 }}
          start={() => (
            <span className={"text-base font-mono"}>
              {path
                .replace(/^\/admin\//, "")
                .split("/")
                .join(" > ")}
            </span>
          )}
          end={() => (
            <span className={"flex flex-row items-center gap-x-4"}>
              <FaUserShield size={28} color={"gray"} />
              <BiLogOut
                className={"cursor-pointer"}
                onClick={() => signOut()}
                size={32}
                color={"red"}
              />
            </span>
          )}
        />
        <div className={"px-8 py-4"}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
