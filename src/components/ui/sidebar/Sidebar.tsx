"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
    IoBodyOutline,
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoManOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline,
    IoWomanOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
    const closeMenu = useUIStore((state) => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === "admin";

    const inputRef = useRef<HTMLInputElement>(null);
    const shouldFocusInput = useUIStore(state => state.shouldFocusInput);
    const resetFocusInput = useUIStore(state => state.resetFocusInput);

    useEffect(() => {
        if (shouldFocusInput) {
            inputRef.current?.focus();
            resetFocusInput();  // resetea para que el trigger funcione otra vez después
        }
    }, [shouldFocusInput, resetFocusInput]);

    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    function handleSearch() {
        if (!inputValue.trim()) return;
        router.push(`/search?param=${encodeURIComponent(inputValue)}`);
        closeMenu();
    }

    return (
        <div>
            {/* Background black */}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
            )}

            {/* Blur */}
            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )}

            {/* Sidemenu */}
            <nav
                className={clsx(
                    "fixed p-5 right-0 top-0 w-[300px] lg:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )}
            >
                <Link
                    href="/gender/men"
                    onClick={() => closeMenu()}
                >
                    <IoManOutline
                        size={40}
                        className="absolute top-6 left-5 cursor-pointer block sm:hidden"
                    />
                </Link>

                <Link
                    href="/gender/women"
                    onClick={() => closeMenu()}
                >
                    <IoWomanOutline
                        size={40}
                        className="absolute top-6 left-15 cursor-pointer block sm:hidden"
                        onClick={() => closeMenu()}
                    />
                </Link>

                <Link
                    href="/gender/kid"
                    onClick={() => closeMenu()}
                >
                    <IoManOutline
                        size={30}
                        className="absolute top-8 left-25 cursor-pointer block sm:hidden"
                        onClick={() => closeMenu()}
                    />
                </Link>

                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input */}
                <div className="relative mt-20">
                    <IoSearchOutline id="search" size={20} className="absolute top-2 left-2" />

                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Buscar"
                        className="sm:w-[75%] w-[60%] bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />

                    <button className="btn-primary sm:w-[20%] w-[30%] float-end cursor-pointer" onClick={handleSearch}>
                        Buscar
                    </button>
                </div>

                {/* Menú */}
                {isAuthenticated && (
                    <>
                        <Link
                            href="/profile"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPersonOutline size={30} />
                            <span className="ml-3 text-xl">Perfil</span>
                        </Link>

                        <Link
                            href="/orders"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>
                    </>
                )}

                {isAuthenticated && (
                    <button
                        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => { logout(); closeMenu(); } }
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl">Salir</span>
                    </button>
                )}

                {!isAuthenticated && (
                    <Link
                        href="/auth/login"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => closeMenu()}
                    >
                        <IoLogInOutline size={30} />
                        <span className="ml-3 text-xl">Ingresar</span>
                    </Link>
                )}

                {isAdmin && (
                    <>
                        {/* Line Separator */}
                        <div className="w-full h-px bg-gray-200 my-10" />

                        <Link
                            href="/admin/products"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoShirtOutline size={30} />
                            <span className="ml-3 text-xl">Productos</span>
                        </Link>

                        <Link
                            href="/admin/orders"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Ordenes</span>
                        </Link>

                        <Link
                            href="/admin/users"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPeopleOutline size={30} />
                            <span className="ml-3 text-xl">Usuarios</span>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};