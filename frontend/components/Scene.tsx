import { useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from "three"

export const Scene = () => {
    let tex = useTexture("./image3.webp");

    return (
        <mesh>
        <cylinderGeometry args={[1.5, 1.5, 1.5, 60, 30, true]} />
        <meshStandardMaterial map={tex} side={THREE.DoubleSide} />
    </mesh>
)
}