import { Appbar } from "@/components/Appbar";
import { Circular_Canvas } from "@/components/Circular_Canvas";
import { HeroSectionLanding } from "@/components/HeroSectionlanding";

export default function Home() {
  return <div className="bg-white w-full h-full justify-center">
    <Appbar/>
    <div className="justify-center flex">
      <div className="">
    <Circular_Canvas></Circular_Canvas>
    {/* <HeroSectionLanding></HeroSectionLanding> */}
    </div>
    </div>
  </div>
}
