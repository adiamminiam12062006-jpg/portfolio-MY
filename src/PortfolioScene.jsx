import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const accents = {
  health: "#5269f5",
  ekart: "#36bfc1",
  student: "#e89d7e",
  portfolio: "#9175e7",
};

function Sculpture({ activeScene, activeProject }) {
  const root = useRef();
  const core = useRef();
  const inner = useRef();
  const wire = useRef();
  const ringOne = useRef();
  const ringTwo = useRef();
  const orbitGroup = useRef();
  const floatingGroup = useRef();

  const activeColor = accents[activeProject] || accents.health;

  useEffect(() => {
    if (inner.current) {
      inner.current.material.color.set(activeColor);
      inner.current.material.emissive.set(activeColor);
    }

    if (wire.current) {
      wire.current.material.color.set(activeColor);
    }
  }, [activeColor]);

  useFrame((state, delta) => {
    if (!root.current) return;

    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Gentle, cursor-responsive movement.
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.x * 0.16 + Math.sin(t * 0.2) * 0.05,
      2,
      delta
    );

    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      -pointer.y * 0.12,
      2,
      delta
    );

    root.current.position.y =
      Math.sin(t * 0.65) * 0.075;

    if (core.current) {
      core.current.rotation.y += delta * 0.14;
      core.current.rotation.x += delta * 0.055;

      // Slightly alter the core's size between scroll chapters.
      const targetScale =
        activeScene === 3 ? 1.07 :
        activeScene === 2 ? 0.94 :
        activeScene === 5 ? 0.91 : 1;

      const scale = THREE.MathUtils.damp(
        core.current.scale.x,
        targetScale,
        2,
        delta
      );

      core.current.scale.setScalar(scale);
    }

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.18;
      inner.current.rotation.x += delta * 0.09;
    }

    if (wire.current) {
      wire.current.rotation.y -= delta * 0.06;
    }

    if (ringOne.current) {
      ringOne.current.rotation.z += delta * 0.11;
      ringOne.current.rotation.y += delta * 0.035;
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.z -= delta * 0.075;
    }

    if (orbitGroup.current) {
      orbitGroup.current.rotation.y += delta * 0.12;
    }

    if (floatingGroup.current) {
      floatingGroup.current.children.forEach((object, index) => {
        object.rotation.x += delta * (0.12 + index * 0.035);
        object.rotation.y += delta * (0.18 + index * 0.025);
      });
    }
  });

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e8ebff",
        metalness: 0.32,
        roughness: 0.19,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        reflectivity: 0.85,
      }),
    []
  );

  const innerMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#5269f5",
        metalness: 0.48,
        roughness: 0.23,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        emissive: "#5269f5",
        emissiveIntensity: 0.045,
      }),
    []
  );

  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#5269f5",
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      }),
    []
  );

  return (
    <group ref={root}>
      {/* Soft, non-photoreal contact shadow. */}
      <mesh
        position={[0, -1.55, -0.75]}
        scale={[1.8, 0.42, 1]}
      >
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          color="#8795b8"
          transparent
          opacity={0.095}
          depthWrite={false}
        />
      </mesh>

      {/* Outer dimensional rings. */}
      <group ref={ringOne}>
        <mesh
          rotation={[1.06, 0.22, -0.3]}
          scale={[1.48, 1, 1]}
        >
          <torusGeometry args={[1.42, 0.012, 10, 160]} />
          <meshStandardMaterial
            color="#5369ee"
            metalness={0.72}
            roughness={0.22}
          />
        </mesh>

        <mesh rotation={[0.42, 0.92, 0.25]}>
          <torusGeometry args={[1.86, 0.009, 8, 180]} />
          <meshStandardMaterial
            color="#75cbcf"
            metalness={0.6}
            roughness={0.24}
          />
        </mesh>
      </group>

      <group ref={ringTwo}>
        <mesh rotation={[1.25, -0.55, 0.72]}>
          <torusGeometry args={[1.65, 0.007, 8, 180]} />
          <meshStandardMaterial
            color="#a994ec"
            metalness={0.65}
            roughness={0.23}
          />
        </mesh>
      </group>

      {/* Main translucent, faceted glass form. */}
      <mesh
        ref={core}
        geometry={new THREE.IcosahedronGeometry(0.99, 1)}
        material={accentMaterial}
      />

      {/* Coloured inner crystal. */}
      <mesh
        ref={inner}
        geometry={new THREE.OctahedronGeometry(0.65, 1)}
        material={innerMaterial}
      />

      {/* Precise wireframe shell. */}
      <mesh
        ref={wire}
        geometry={new THREE.IcosahedronGeometry(1.08, 1)}
        material={wireMaterial}
      />

      {/* Floating, polished forms around the sculpture. */}
      <group ref={floatingGroup}>
        <mesh position={[-1.55, 0.9, 0.05]}>
          <icosahedronGeometry args={[0.19, 1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.28}
            roughness={0.12}
            clearcoat={1}
          />
        </mesh>

        <mesh position={[1.48, 0.75, -0.2]}>
          <boxGeometry args={[0.31, 0.31, 0.31]} />
          <meshPhysicalMaterial
            color="#dfe5ff"
            metalness={0.42}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>

        <mesh position={[1.54, -0.76, 0.15]}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshPhysicalMaterial
            color="#75d2d1"
            metalness={0.48}
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>

        <mesh position={[-1.45, -0.82, 0]}>
          <dodecahedronGeometry args={[0.19, 0]} />
          <meshPhysicalMaterial
            color="#c2b2ff"
            metalness={0.42}
            roughness={0.23}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Small orbiting nodes. */}
      <group ref={orbitGroup}>
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const radius = 2.08;

          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * 1.42,
                Math.sin(angle * 2) * 0.22,
              ]}
            >
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial
                color={index % 2 ? "#6f83fb" : "#6bc6c8"}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function FineParticles() {
  const points = useMemo(() => {
    const count = 320;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.6;
      positions[i * 3 + 2] = -1.6 - Math.random() * 2.5;
    }

    return positions;
  }, []);

  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#a6b1cb"
        size={0.014}
        transparent
        opacity={0.42}
        sizeAttenuation
      />
    </points>
  );
}

export default function PortfolioScene({
  activeScene = 0,
  activeProject = "health",
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6.6],
        fov: 38,
      }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#ffffff", 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
    >
      <ambientLight intensity={1.65} color="#ffffff" />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, 1, 2]}
        intensity={1.8}
        color="#cbd5ff"
      />

      <pointLight
        position={[1, 2, 3]}
        intensity={22}
        distance={10}
        color="#b2a3ff"
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={15}
        distance={8}
        color="#80d7d7"
      />

      <FineParticles />

      <Sculpture
        activeScene={activeScene}
        activeProject={activeProject}
      />
    </Canvas>
  );
}