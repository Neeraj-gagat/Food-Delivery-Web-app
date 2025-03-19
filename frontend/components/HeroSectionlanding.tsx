import Image from "next/image"
import { Circular_Canvas } from "./Circular_Canvas"

export const HeroSectionLanding = () => {
    return <div className="flex justify-center bg-red-700 pt-8">
        <div className="font-extrabold text-white pt-28 pr-20 text-4xl justify-center">
        <p>Craving something delicious?</p>
        <p className="text-center"> We&apos;ve got it covered!</p>
        </div>
        <div className="pb-12">
        <Circular_Canvas/>
        </div>
        {/* <div className="max-w-4xl justify-center flex"><Image alt="iamge" src={"/hero.jpg"} height={500} width={500}/></div> */}
    </div>
}