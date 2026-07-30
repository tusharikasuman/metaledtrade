import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  Suspense,
  useEffect,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "../../lib/utils";

// ============================================================================
// Constants
// ============================================================================
const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// ============================================================================
// Utility
// ============================================================================
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// ============================================================================
// Marker
// ============================================================================
function Marker({ marker, radius, onClick, onHover }) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const imageGroupRef = useRef(null);
  const { camera } = useThree();

  const surfacePosition = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, radius * 1.001),
    [marker.lat, marker.lng, radius]
  );

  const topPosition = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, radius * 1.18),
    [marker.lat, marker.lng, radius]
  );

  const lineHeight = topPosition.distanceTo(surfacePosition);

  useFrame(() => {
    if (!imageGroupRef.current) return;
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);
    const markerDirection = worldPos.clone().normalize();
    const cameraDirection = camera.position.clone().normalize();
    const dot = markerDirection.dot(cameraDirection);
    setIsVisible(dot > 0.1);
  });

  const handleEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => onClick?.(marker), [marker, onClick]);

  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  return (
    <group visible={isVisible}>
      {/* Pin line */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffe088" : "#8e9192"}
          transparent
          opacity={hovered ? 0.9 : 0.5}
        />
      </mesh>

      {/* Pin point at surface */}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? "#ffe088" : "#ffe088"} />
      </mesh>

      {/* Avatar at top */}
      <group ref={imageGroupRef} position={topPosition}>
        <Html
          transform
          center
          sprite
          distanceFactor={10}
          style={{
            pointerEvents: isVisible ? "auto" : "none",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.15s ease-out",
          }}
        >
          <div
            className={cn(
              "relative cursor-pointer overflow-visible rounded-full bg-neutral-950 shadow-xl transition-all duration-300 border-2 border-[#ffe088] flex items-center justify-center",
              hovered ? "scale-125 ring-4 ring-[#ffe088]/50 z-50" : "hover:scale-110"
            )}
            style={{ width: "32px", height: "32px" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onClick={handleClick}
          >
            <img
              src={marker.src}
              alt={marker.name || marker.label || "Project Pin"}
              className="h-full w-full object-cover rounded-full"
              draggable={false}
            />
            {hovered && (
              <div className="absolute left-1/2 -bottom-14 -translate-x-1/2 whitespace-nowrap bg-[#12141a]/95 border border-[#ffe088]/60 px-3 py-1.5 rounded-md shadow-2xl backdrop-blur-md text-left pointer-events-none z-50 animate-in fade-in duration-150">
                <p className="text-[11px] font-bold text-[#ffe088] leading-none">{marker.name || marker.label}</p>
                <p className="text-[9px] text-zinc-300 mt-1 leading-none font-medium">{marker.location || marker.country}</p>
                {marker.material && (
                  <p className="text-[8px] text-zinc-400 mt-1 leading-none italic">{marker.material}</p>
                )}
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

// ============================================================================
// Globe Mesh
// ============================================================================
function RotatingGlobe({ config, markers, onMarkerClick, onMarkerHover }) {
  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);

  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) bumpTexture.anisotropy = 8;
  }, [earthTexture, bumpTexture]);

  const geometry = useMemo(
    () => new THREE.SphereGeometry(config.radius, 64, 64),
    [config.radius]
  );

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {markers.map((marker, i) => (
        <Marker
          key={`${i}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}
    </group>
  );
}

// ============================================================================
// Atmosphere
// ============================================================================
function Atmosphere({ radius, color, intensity, blur }) {
  const fresnelPower = Math.max(0.5, 5 - blur);

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          atmosphereColor: { value: new THREE.Color(color) },
          intensity: { value: intensity },
          fresnelPower: { value: fresnelPower },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 atmosphereColor;
          uniform float intensity;
          uniform float fresnelPower;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
            gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    [color, intensity, fresnelPower]
  );

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

// ============================================================================
// Scene
// ============================================================================
function Scene({ markers, config, onMarkerClick, onMarkerHover }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 5, config.radius * 2, config.radius * 5]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />
      <directionalLight
        position={[-config.radius * 3, config.radius, -config.radius * 2]}
        intensity={config.pointLightIntensity * 0.3}
        color="#88ccff"
      />
      <RotatingGlobe
        config={config}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

// ============================================================================
// Loading fallback
// ============================================================================
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full border-2 border-[#ffe088] border-t-transparent animate-spin" />
        <span className="text-sm text-[#8e9192]">Loading globe…</span>
      </div>
    </Html>
  );
}

// ============================================================================
// Default config
// ============================================================================
const defaultConfig = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: true,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
};

// ============================================================================
// Main export
// ============================================================================
export function Globe3D({ markers = [], config = {}, className, onMarkerClick, onMarkerHover }) {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  return (
    <div className={cn("relative w-full", className)} style={{ height: "550px" }}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, mergedConfig.radius * 3.5] }}
        style={{ background: mergedConfig.backgroundColor || "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
