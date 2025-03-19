"use client"
import Image from "next/image"
import { AppbarButton } from "./AppbarButton"

export const Appbar = () => {
    return <div className="bg-red-700 p-1"> 
        <div className="flex justify-between shadow-sm rounded-xl bg-white w-full h-[100px] border-b px-32 py-6">
            <div className="flex justify-center"> <Image alt="iamge" src={"/Logo.png"} width={100} height={30}/></div>
                <div className="flex my-auto space-x-12">
                    <AppbarButton onClick={() => {}}>Corporate</AppbarButton>
                    <AppbarButton onClick={() => {}}>Offers</AppbarButton>
                    <AppbarButton onClick={() => {}}>Sign in</AppbarButton>
                    <AppbarButton onClick={() => {}}>Cart</AppbarButton>
            </div>
        </div>
    </div>
} 