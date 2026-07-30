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
function Marker({ marker, radius, onClick, onHover, isModalOpen }) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const imageGroupRef = useRef(null);
  const { camera } = useThree();

  const topLat = marker.lat + (marker.latOffset || 0);
  const topLng = marker.lng + (marker.lngOffset || 0);
  const altitudeMultiplier = marker.altitude || 1.25;

  const surfacePosition = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, radius * 1.001),
    [marker.lat, marker.lng, radius]
  );

  const topPosition = useMemo(
    () => latLngToVector3(topLat, topLng, radius * altitudeMultiplier),
    [topLat, topLng, radius, altitudeMultiplier]
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

  const showHtml = isVisible && !isModalOpen;

  return (
    <group visible={showHtml}>
      {/* Pin leader line connecting surface dot to floating avatar */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffd862" : "#a1a1aa"}
          transparent
          opacity={hovered ? 0.95 : 0.6}
        />
      </mesh>

      {/* Red/Gold Surface Anchor Dot on exact map location */}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Floating Circular Photo Avatar Badge (Matching Reference Image) */}
      <group ref={imageGroupRef} position={topPosition}>
        {showHtml && (
          <Html
            transform
            center
            sprite
            distanceFactor={10}
            zIndexRange={[1, 10]}
            style={{
              display: isModalOpen ? "none" : "block",
              pointerEvents: showHtml ? "auto" : "none",
              opacity: showHtml ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
          >
            <div
              className="relative cursor-pointer group select-none flex flex-col items-center"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onClick={handleClick}
            >
              {/* Circular Avatar Photo Badge */}
              <div
                className={cn(
                  "relative rounded-full border-2 border-[#ffd862] bg-[#12141a] shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden",
                  hovered
                    ? "scale-130 ring-4 ring-[#ffd862]/60 z-30 shadow-[#ffd862]/50"
                    : "hover:scale-110 shadow-black/80"
                )}
                style={{ width: "28px", height: "28px" }}
              >
                <img
                  src={marker.src}
                  alt={marker.name || "Project Pin"}
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                />
              </div>
            </div>
          </Html>
        )}
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
export function Globe3D({ markers = [], config = {}, className, onMarkerClick, onMarkerHover, isModalOpen }) {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  return (
    <div className={cn("relative w-full", className)} style={{ height: "680px" }}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ fov: 42, near: 0.1, far: 1000, position: [0, 0, mergedConfig.radius * 3.4] }}
        style={{ background: mergedConfig.backgroundColor || "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
            isModalOpen={isModalOpen}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
