"use client";
import React, { useState } from "react";
import Link from "next/link";

import Heading from "../general/Heading";
import { FaRegListAlt, FaPlus, FaMinus, FaTimes, FaBars } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import {AiFillDashboard, AiFillProduct} from "react-icons/ai";
import { BiSolidDiscount } from "react-icons/bi";
import { TbSettingsCog } from "react-icons/tb";

const SideBar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const adminPanel = [
    {
      name: "General",
      icon: IoMdHome,
      options: [
        { name: "Go to Home", url: "/" },
        { name: "Contact List", url: "/admin/contacts" },
        { name: "Orders", url: "/admin" },
      ],
    },

    {
      name: "Products",
      icon: AiFillProduct,
      options: [
        { name: "All Product", url: "/admin/product" },
        { name: "Create Product", url: "/admin/product/create" },
      ],
    },
    {
      name: "Categories",
      icon: MdCategory,
      options: [{ name: "Create Category", url: "/admin/category/create" }],
    },
    {
      name: "Blogs",
      icon: FaRegListAlt,
      options: [
        { name: "All Blog", url: "/admin/blog" },
        { name: "Create Blog", url: "/admin/blog/create" },
      ],
    },
    {
      name: "Coupons",
      icon: BiSolidDiscount,
      options: [
        { name: "All Coupon", url: "/admin/coupon" },
        { name: "Create Coupon", url: "/admin/coupon/create" },
      ],
    },
    {
      name: "Settings",
      icon: TbSettingsCog,
      options: [{ name: "Color", url: "/admin/settings/product-colors" }],
    },
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed h-10 w-10 top-24 right-6 md:top-32 md:right-12  lg:hidden p-2 text-white bg-secondary border border-mywhite rounded-lg flex items-center justify-center z-50"
      >
        {isOpen ? <FaTimes size={17} /> : <FaBars size={17} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:sticky top-0 left-0 bg-gray-100 md:w-52 text-mywhite h-screen p-4 z-50 transition-transform 
        duration-300 ease-in-out lg:translate-x-0 md:border-r lg:border-none  lg:w-72`}
      >
        <Heading text="Admin Panel" textSize="3xl" color="black" hr />

        <ul className="space-y-4 mt-3">
          <li>
            <div className="flex items-center justify-between cursor-pointer p-3 rounded-md hover:bg-third border-">
              <div className="flex items-center gap-3">
                <AiFillDashboard size={20} />
                <Link href={'/admin'}>Dashboard/Orders</Link>
              </div>
            </div>
          </li>
          {adminPanel.map((menu) => (
              <li key={menu.name}>
                <div
                    className="flex items-center justify-between cursor-pointer p-3 rounded-md hover:bg-third border-"
                    onClick={() => toggleMenu(menu.name)}
                >
                  <div className="flex items-center gap-3">
                    <menu.icon size={20}/>
                    <span>{menu.name}</span>
                  </div>
                  <span>
                  {openMenu === menu.name ? (
                      <FaMinus size={10}/>
                  ) : (
                      <FaPlus size={10}/>
                  )}
                </span>
                </div>
                {openMenu === menu.name && (
                    <ul className="mt-2 ml-6 space-y-2 border-l rounded-md border-mywhite">
                      {menu.options.map((option) => (
                          <li key={option.name}>
                            <Link
                                className="block p-2 rounded-md text-sm hover:bg-third ml-1"
                                href={option.url}
                            >
                              {option.name}
                            </Link>
                          </li>
                      ))}
                    </ul>
                )}
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
