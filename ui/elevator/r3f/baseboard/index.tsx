"use client";

export const Baseboard = () => {
  return (
    <mesh position={[0, -1.5, 0]} receiveShadow>
      <boxGeometry args={[8, 0.2, 0.3]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.2}
        roughness={0.8}
        toneMapped={false}
      />
    </mesh>
  );
};
