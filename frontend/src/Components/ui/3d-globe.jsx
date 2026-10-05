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
const PIN_GOLD = "#e9c349";

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

  // Hide pins on the far side of the globe. Only update state when visibility
  // actually flips — setting it every frame re-rendered every pin 60×/second.
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    if (!imageGroupRef.current) return;
    imageGroupRef.current.getWorldPosition(worldPos);
    const visible = worldPos.normalize().dot(camera.position.clone().normalize()) > 0.1;
    setIsVisible((prev) => (prev === visible ? prev : visible));
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

  // Lays the halo disc flat against the globe surface.
  const surfaceQuaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        surfacePosition.clone().normalize()
      ),
    [surfacePosition]
  );

  const showHtml = isVisible && !isModalOpen;

  return (
    <group visible={showHtml}>
      {/* Leader line from the exact location to the photo tile */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.0035, 0.0035, lineHeight, 8]} />
        <meshBasicMaterial color={PIN_GOLD} transparent opacity={hovered ? 1 : 0.7} />
      </mesh>

      {/* Location dot: gold centre on a flat white halo, readable on land and sea */}
      <mesh position={surfacePosition} quaternion={surfaceQuaternion}>
        <circleGeometry args={[0.026, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={surfacePosition}>
        <sphereGeometry args={[0.016, 20, 20]} />
        <meshBasicMaterial color={PIN_GOLD} />
      </mesh>

      {/* Photo tile */}
      <group ref={imageGroupRef} position={topPosition}>
        {showHtml && (
          <Html
            transform
            center
            sprite
            distanceFactor={2}
            // The hovered pin jumps above its neighbours so its label is never covered.
            zIndexRange={hovered ? [100, 90] : [10, 1]}
          >
            <button
              type="button"
              aria-label={`View project: ${marker.name}`}
              className="relative block cursor-pointer select-none outline-none"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              onFocus={handleEnter}
              onBlur={handleLeave}
              onClick={handleClick}
            >
              <span
                className={cn(
                  "block overflow-hidden rounded-[10px] border-[3px] bg-[#12141a] shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out",
                  hovered ? "scale-110 border-[#e9c349]" : "border-white"
                )}
                style={{ width: 64, height: 64 }}
              >
                <img
                  src={marker.src}
                  alt=""
                  className="h-full w-full object-cover"
                  decoding="async"
                  draggable={false}
                />
              </span>

              {/* Name label, shown on hover */}
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#131313]/90 px-2.5 py-1.5 text-left shadow-lg transition-all duration-200",
                  hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                )}
              >
                <span className="block text-[11px] font-semibold leading-tight text-white">{marker.name}</span>
                {marker.country && (
                  <span className="block text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#e9c349]">
                    {marker.country}
                  </span>
                )}
              </span>
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}

// ============================================================================
// Globe Mesh
// ============================================================================
function RotatingGlobe({ config, markers, onMarkerClick, onMarkerHover, isModalOpen }) {
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
          isModalOpen={isModalOpen}
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
function Scene({ markers, config, onMarkerClick, onMarkerHover, isModalOpen }) {
  const { camera } = useThree();

  useEffect(() => {
    // Optionally start with a given lat/lng facing the viewer.
    if (config.focus) {
      camera.position.copy(latLngToVector3(config.focus.lat, config.focus.lng, config.radius * 3.5));
    } else {
      camera.position.set(0, 0, config.radius * 3.5);
    }
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius, config.focus]);

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
        isModalOpen={isModalOpen}
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
