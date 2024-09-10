"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene";

export const Circular_Canvas = () => {

    return ( <div className="w-full h-full flex justify-center">
        <Canvas camera={{fov: 25}} style={{width:"400px", height:"400px" }}>
            <OrbitControls/>
            <ambientLight />
            <Scene/>
        </Canvas>
    </div>
    );
}