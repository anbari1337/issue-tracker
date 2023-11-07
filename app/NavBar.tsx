"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import cx from "classnames";

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issue",
  },
];
const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex space-x-6 mb-8 px-5 h-14 border-b items-center'>
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li
            key={link.href}
            className={cx("hover:text-zinc-800 transition-colors", {
              "text-zinc-900": pathname === link.href,
              "text-zinc-500": pathname !== link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
