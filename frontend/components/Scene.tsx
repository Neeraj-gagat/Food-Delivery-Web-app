import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three"

export const Scene = () => {
    let tex = useTexture("./food.png");
    let cyl = useRef(null);
    
    useFrame((state,delta) => {
        if (cyl.current) {
            // @ts-ignore
            cyl.current.rotation.y += delta;            
        }
    });

    return (
        <group rotation={[0,1.4,0.5]}> 
            <mesh ref={cyl} >
                <cylinderGeometry args={[2, 2, 2, 60, 60, true]} />
                <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
)
}