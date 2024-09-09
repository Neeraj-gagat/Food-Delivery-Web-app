"use client"
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"

export const Circular_Canvas = () => {
    return ( <div className="w-full h-full flex justify-center fixed">
        <Canvas style={{width: "500px", height: "500px"}}>
            <OrbitControls/>
            <ambientLight />
            <mesh>
                <cylinderGeometry args={[1.5, 1.5, 1.5, 30, 30,]} />
                <meshStandardMaterial/>
            </mesh>
        </Canvas>
    </div>
    );
}