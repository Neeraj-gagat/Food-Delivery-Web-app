"use client"
import { Canvas } from "@react-three/fiber"

export const Circular_Canvas = () => {
    return <Canvas>
        <mesh>
            <boxGeometry/>
            <meshBasicMaterial/>
        </mesh>
    </Canvas>
}