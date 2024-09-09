"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene";

export const Circular_Canvas = () => {

    return ( <div className="w-full h-full flex justify-center fixed">
        <Canvas style={{width: "500px", height: "500px"}}>
            <OrbitControls/>
            <ambientLight />
            <Scene/>
        </Canvas>
    </div>
    );
}