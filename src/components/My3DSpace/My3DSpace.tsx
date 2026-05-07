import {
  Fn,
  vec3,
  vec4,
  normalWorld,
  positionWorld,
  cameraPosition,
  float,
  sin,
  mix,
} from "three/tsl";
import { OrbitControls, useEnvironment } from "@react-three/drei";
import { EquirectangularReflectionMapping } from "three";
export function My3DSpace() {
  const env = useEnvironment({ files: [`/hdr/sundowner_overlook_1k.hdr`] });
  env.mapping = EquirectangularReflectionMapping;
  const diamondColor = Fn(() => {
    const n = normalWorld.normalize();
    const viewDir = cameraPosition.sub(positionWorld).normalize();

    // Fresnel — stronger at glancing angles
    const fresnel = float(1).sub(n.dot(viewDir).abs()).pow(3);

    // Dispersion: rainbow colour shift driven by normal direction
    const d = n.x.add(n.y).add(n.z).mul(float(4));
    const r = sin(d).mul(0.5).add(0.5);
    const g = sin(d.add(float(2.094)))
      .mul(0.5)
      .add(0.5); // +2π/3
    const b = sin(d.add(float(4.189)))
      .mul(0.5)
      .add(0.5); // +4π/3

    const baseWhite = vec3(0.85, 0.85, 0.95);
    const rainbow = vec3(r, g, b);
    const col = baseWhite.add(rainbow.mul(fresnel).mul(float(0.35)));

    return vec4(col, 1);
  })();

  return (
    <>
      <mesh>
        <meshStandardNodeMaterial
          colorNode={diamondColor}
          metalness={0.05}
          roughness={0.15}
          envMap={env}
        />
        <sphereGeometry />
      </mesh>
      <OrbitControls></OrbitControls>
    </>
  );
}
