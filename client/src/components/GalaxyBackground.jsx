//Hooks
import { useRef, Suspense } from "react";

//Animation
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = ({
  count = 2000,
  size = 0.002,
  color = "#ffffff",
  rotationSpeed = 0.02,
}) => {
  const pointsRef = useRef(null);

  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.2 });

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * (rotationSpeed * 0.2);
      pointsRef.current.rotation.y -= delta * rotationSpeed;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const GalaxyBackground = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{ zIndex: -1 }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars
            count={2000}
            size={0.0015}
            color="#ffffff"
            rotationSpeed={0.02}
          />
          <Stars
            count={2000}
            size={0.0025}
            color="#f272c8"
            rotationSpeed={0.05}
          />
          <Stars
            count={1000}
            size={0.003}
            color="#add8e6"
            rotationSpeed={0.1}
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default GalaxyBackground;
