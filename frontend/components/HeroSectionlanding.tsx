import Image from "next/image"

export const HeroSectionLanding = () => {
    return <div className="flex flex-col justify-center pt-8">
        <div className="font-extrabold text-red-700 text-2xl pb-8 justify-center">
        Craving something delicious? We&apos;ve got it covered!
        </div>
        <div className="max-w-4xl justify-center flex"><Image alt="iamge" src={"/hero.jpg"} height={500} width={500}/></div>
    </div>
}