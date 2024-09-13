"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";


export const Circular_Canvas = () => {

    return ( <div className="w-screen h-screen flex justify-center">
        <Canvas  style={{width:"800px", height:"600px" }}>
            <OrbitControls/>
            <ambientLight />
            <Scene/>
            <EffectComposer > 
            <Bloom
                mipmapBlur
                intensity={7.0} // The bloom intensity.
                luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
                />
                {/* <ToneMapping adaptive/> */}
            </EffectComposer>          
        </Canvas>
    </div>
    );
}