"use client"
import Image from "next/image"
import { AppbarButton } from "./AppbarButton"

export const Appbar = () => {
    return <div className="flex justify-between shadow-sm w-full h-[80px] border-b px-20 py-6">
        <div className="flex justify-center"> <Image alt="iamge" src={"/Logo.png"} width={70} height={30}/></div>
        <div className="flex space-x-4">
            <AppbarButton onClick={() => {}}>corporate</AppbarButton>
            <AppbarButton onClick={() => {}}>offers</AppbarButton>
            <AppbarButton onClick={() => {}}>Sign in</AppbarButton>
            <AppbarButton onClick={() => {}}>Cart</AppbarButton>
        </div>
    </div>
} 