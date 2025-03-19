"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";


export const Circular_Canvas = () => {

    return ( <div className="bg-red-700 pb-8 w-[400px] h-[300px] flex justify-center">
        <Canvas camera={{fov:52}}>
            <OrbitControls enableZoom={false}/>
            <ambientLight />
            <Scene/>
            <EffectComposer > 
            <Bloom
                
                mipmapBlur
                intensity={3.0} // The bloom intensity.
                luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
                />
                <ToneMapping adaptive/>
            </EffectComposer>          
        </Canvas>
    </div>
    );
}