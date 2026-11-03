"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { progresoScroll, ruta, type Parada } from "@/lib/ruta";

const COLORES = {
  pasto: "#79c25b",
  pastoOscuro: "#5aa647",
  tierra: "#b0794a",
  arena: "#f3d79e",
  roca: "#8d93a8",
  mar: "#4aa6ea",
  madera: "#9a643c",
  moneda: "#ffc531",
  tinta: "#14213d",
  blanco: "#fdfbf6",
  techo: "#e2574c",
  hoodie: "#1f3a6d",
  piel: "#d9a07a",
  pelo: "#1b1410",
};

const PALETA_EDIFICIOS = [
  ["#f4efe6", "#9ccdf5", "#ffc531"],
  ["#e9eef8", "#7fb0ea", "#79c25b"],
  ["#f6ece2", "#f2a65a", "#9ccdf5"],
  ["#eef3ea", "#b7a3e8", "#ffc531"],
];

const curva = new THREE.CatmullRomCurve3(
  ruta.map((p) => new THREE.Vector3(...p.posicion)),
  false,
  "catmullrom",
  0.4,
);

function suavizar(x: number) {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function parametroCurva(progreso: number) {
  const tramos = ruta.length - 1;
  const f = progreso * tramos;
  const i = Math.min(Math.floor(f), tramos - 1);
  const local = suavizar((f - i - 0.18) / 0.64);
  return (i + local) / tramos;
}

const reducirMovimiento =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Material({ color, emisivo }: { color: string; emisivo?: string }) {
  return <meshLambertMaterial color={color} flatShading emissive={emisivo ?? "#000000"} />;
}

function BaseIsla({ radio = 5 }: { radio?: number }) {
  return (
    <group>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[radio + 0.9, radio + 1.3, 0.6, 9]} />
        <Material color={COLORES.arena} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[radio, radio + 0.4, 0.7, 9]} />
        <Material color={COLORES.pasto} />
      </mesh>
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[radio + 0.6, radio * 0.45, 3, 9]} />
        <Material color={COLORES.tierra} />
      </mesh>
    </group>
  );
}

function Arbol({ posicion, escala = 1 }: { posicion: [number, number, number]; escala?: number }) {
  return (
    <group position={posicion} scale={escala}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.15, 0.22, 1.2, 5]} />
        <Material color={COLORES.madera} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.9, 1.6, 6]} />
        <Material color={COLORES.pastoOscuro} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <coneGeometry args={[0.65, 1.2, 6]} />
        <Material color={COLORES.pasto} />
      </mesh>
    </group>
  );
}

function Moneda({ posicion }: { posicion: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((estado) => {
    if (!ref.current || reducirMovimiento) return;
    const t = estado.clock.elapsedTime;
    ref.current.rotation.y = t * 1.6;
    ref.current.position.y = posicion[1] + Math.sin(t * 2) * 0.25;
  });
  return (
    <group ref={ref} position={posicion}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.18, 14]} />
        <Material color={COLORES.moneda} emisivo="#5a3c00" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.22, 14]} />
        <Material color="#ffdd7a" emisivo="#5a3c00" />
      </mesh>
    </group>
  );
}

function IslaInicio() {
  return (
    <group>
      <BaseIsla />
      <group position={[-1.2, 0.7, -0.8]}>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[2.4, 1.8, 2]} />
          <Material color={COLORES.blanco} />
        </mesh>
        <mesh position={[0, 2.3, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.95, 1.2, 4]} />
          <Material color={COLORES.techo} />
        </mesh>
        <mesh position={[0.35, 0.55, 1.01]}>
          <boxGeometry args={[0.6, 1.1, 0.05]} />
          <Material color={COLORES.madera} />
        </mesh>
        <mesh position={[-0.6, 1.1, 1.01]}>
          <boxGeometry args={[0.5, 0.5, 0.05]} />
          <Material color="#9ccdf5" emisivo="#1d3b5c" />
        </mesh>
      </group>
      <group position={[2.3, 0.7, 0.6]}>
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 3.2, 5]} />
          <Material color={COLORES.tinta} />
        </mesh>
        <Bandera />
      </group>
      <Arbol posicion={[2.6, 0.7, -2.2]} />
      <Arbol posicion={[-3.4, 0.7, 1.6]} escala={0.8} />
    </group>
  );
}

function Bandera() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((estado) => {
    if (!ref.current || reducirMovimiento) return;
    ref.current.rotation.y = Math.sin(estado.clock.elapsedTime * 3) * 0.18;
  });
  return (
    <mesh ref={ref} position={[0.6, 2.8, 0]}>
      <boxGeometry args={[1.2, 0.75, 0.05]} />
      <Material color={COLORES.moneda} />
    </mesh>
  );
}

function IslaTrabajo({ indice }: { indice: number }) {
  const paleta = PALETA_EDIFICIOS[indice % PALETA_EDIFICIOS.length];
  const edificios = useMemo(() => {
    const semilla = (n: number) => {
      const x = Math.sin((indice + 1) * 97.13 + n * 13.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return [0, 1, 2].map((n) => ({
      x: -2 + n * 1.9,
      z: -1 + semilla(n) * 1.4,
      alto: 2 + semilla(n + 5) * 3 + (n === 1 ? 1.5 : 0),
      ancho: 1.3 + semilla(n + 9) * 0.5,
    }));
  }, [indice]);

  return (
    <group>
      <BaseIsla />
      {edificios.map((e, n) => (
        <group key={n} position={[e.x, 0.7, e.z]}>
          <mesh position={[0, e.alto / 2, 0]}>
            <boxGeometry args={[e.ancho, e.alto, e.ancho]} />
            <Material color={paleta[0]} />
          </mesh>
          {Array.from({ length: Math.floor(e.alto / 0.8) }).map((_, f) => (
            <mesh key={f} position={[0, 0.55 + f * 0.8, e.ancho / 2 + 0.01]}>
              <boxGeometry args={[e.ancho * 0.7, 0.32, 0.03]} />
              <Material color={paleta[1]} emisivo="#123056" />
            </mesh>
          ))}
          <mesh position={[0, e.alto + 0.12, 0]}>
            <boxGeometry args={[e.ancho + 0.15, 0.24, e.ancho + 0.15]} />
            <Material color={paleta[2]} />
          </mesh>
        </group>
      ))}
      <Arbol posicion={[3.3, 0.7, 1.8]} escala={0.75} />
      <Moneda posicion={[0, 8.2, 0]} />
    </group>
  );
}

function BloqueFlotante({ posicion, color, fase }: { posicion: [number, number, number]; color: string; fase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((estado) => {
    if (!ref.current || reducirMovimiento) return;
    const t = estado.clock.elapsedTime + fase;
    ref.current.position.y = posicion[1] + Math.sin(t * 1.4) * 0.35;
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.8) * 0.3;
  });
  return (
    <mesh ref={ref} position={posicion}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <Material color={color} />
    </mesh>
  );
}

function IslaTaller() {
  const bloques: { p: [number, number, number]; c: string }[] = [
    { p: [-2.4, 3.2, -0.5], c: "#9ccdf5" },
    { p: [-0.8, 4.2, -1.4], c: COLORES.moneda },
    { p: [0.9, 3.6, -0.6], c: "#79c25b" },
    { p: [2.4, 4.5, -1.2], c: "#b7a3e8" },
    { p: [0.2, 5.6, 0.4], c: "#f2a65a" },
  ];
  return (
    <group>
      <BaseIsla />
      <mesh position={[0, 1.1, 1]}>
        <boxGeometry args={[1.6, 0.8, 0.9]} />
        <Material color="#4a5068" />
      </mesh>
      <mesh position={[0, 1.65, 1]}>
        <boxGeometry args={[2.2, 0.35, 1]} />
        <Material color="#5d6480" />
      </mesh>
      {bloques.map((b, i) => (
        <BloqueFlotante key={i} posicion={b.p} color={b.c} fase={i * 1.3} />
      ))}
      <Arbol posicion={[-3.2, 0.7, 2]} escala={0.7} />
    </group>
  );
}

function Bote({ posicion, color, fase }: { posicion: [number, number, number]; color: string; fase: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((estado) => {
    if (!ref.current || reducirMovimiento) return;
    const t = estado.clock.elapsedTime + fase;
    ref.current.position.y = posicion[1] + Math.sin(t * 1.6) * 0.12;
    ref.current.rotation.z = Math.sin(t * 1.2) * 0.06;
  });
  return (
    <group ref={ref} position={posicion}>
      <mesh>
        <boxGeometry args={[2.2, 0.5, 1]} />
        <Material color={color} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 5]} />
        <Material color={COLORES.madera} />
      </mesh>
      <mesh position={[0.35, 1.1, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.6, 0.9, 3]} />
        <Material color={COLORES.blanco} />
      </mesh>
    </group>
  );
}

function IslaPuerto() {
  return (
    <group>
      <BaseIsla radio={4.4} />
      <mesh position={[3.4, 0.25, 3.6]} rotation={[0, -0.6, 0]}>
        <boxGeometry args={[1.4, 0.2, 4.5]} />
        <Material color={COLORES.madera} />
      </mesh>
      <Bote posicion={[6.4, -0.1, 3.2]} color={COLORES.techo} fase={0} />
      <Bote posicion={[1.6, -0.1, 6.6]} color="#7fb0ea" fase={1.7} />
      <mesh position={[-1, 1.4, -1]}>
        <cylinderGeometry args={[0.7, 0.9, 1.6, 8]} />
        <Material color={COLORES.blanco} />
      </mesh>
      <mesh position={[-1, 2.6, -1]}>
        <cylinderGeometry args={[0.5, 0.7, 0.8, 8]} />
        <Material color={COLORES.techo} />
      </mesh>
      <mesh position={[-1, 3.15, -1]}>
        <coneGeometry args={[0.6, 0.6, 8]} />
        <Material color={COLORES.tinta} />
      </mesh>
      <Arbol posicion={[-3, 0.7, 1.4]} escala={0.8} />
    </group>
  );
}

function IslaMeta() {
  const tapa = useRef<THREE.Group>(null);
  const portal = useRef<THREE.Mesh>(null);
  useFrame((estado) => {
    if (reducirMovimiento) return;
    const t = estado.clock.elapsedTime;
    if (tapa.current) tapa.current.rotation.x = -0.35 - Math.abs(Math.sin(t * 0.9)) * 0.35;
    if (portal.current) portal.current.rotation.z = t * 0.4;
  });
  return (
    <group>
      <BaseIsla />
      <group position={[0, 0.7, 0.4]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1.3]} />
          <Material color={COLORES.madera} />
        </mesh>
        <mesh position={[0, 0.5, 0.66]}>
          <boxGeometry args={[0.35, 0.45, 0.05]} />
          <Material color={COLORES.moneda} emisivo="#5a3c00" />
        </mesh>
        <group ref={tapa} position={[0, 1, -0.65]}>
          <mesh position={[0, 0, 0.65]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65, 0.65, 2, 8, 1, false, 0, Math.PI]} />
            <Material color="#b5784a" />
          </mesh>
        </group>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.55, 10, 8]} />
          <meshBasicMaterial color="#ffe08a" transparent opacity={0.55} />
        </mesh>
      </group>
      <mesh ref={portal} position={[0, 5.4, -1.6]}>
        <torusGeometry args={[2, 0.22, 6, 18]} />
        <Material color={COLORES.moneda} emisivo="#4d3300" />
      </mesh>
      <Arbol posicion={[-3, 0.7, -1.6]} escala={0.9} />
      <Arbol posicion={[3.1, 0.7, -1.2]} escala={0.7} />
    </group>
  );
}

function Isla({ parada }: { parada: Parada }) {
  return (
    <group position={parada.posicion}>
      {parada.tipo === "inicio" && <IslaInicio />}
      {parada.tipo === "trabajo" && <IslaTrabajo indice={parada.indiceTrabajo ?? 0} />}
      {parada.tipo === "taller" && <IslaTaller />}
      {parada.tipo === "puerto" && <IslaPuerto />}
      {parada.tipo === "meta" && <IslaMeta />}
    </group>
  );
}

function Piedras() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const posiciones = useMemo(() => {
    const largo = curva.getLength();
    const total = Math.floor(largo / 1.6);
    const lista: THREE.Vector3[] = [];
    for (let i = 0; i <= total; i++) {
      const punto = curva.getPointAt(i / total);
      const cerca = ruta.some(
        (p) => Math.hypot(p.posicion[0] - punto.x, p.posicion[2] - punto.z) < 6.3,
      );
      if (!cerca) lista.push(punto);
    }
    return lista;
  }, []);

  return (
    <instancedMesh
      ref={(malla) => {
        ref.current = malla;
        if (!malla) return;
        const m = new THREE.Matrix4();
        posiciones.forEach((p, i) => {
          m.makeTranslation(p.x, -0.05, p.z);
          malla.setMatrixAt(i, m);
        });
        malla.instanceMatrix.needsUpdate = true;
      }}
      args={[undefined, undefined, posiciones.length]}
    >
      <cylinderGeometry args={[0.55, 0.65, 0.3, 7]} />
      <meshLambertMaterial color={COLORES.roca} flatShading />
    </instancedMesh>
  );
}

function Oceano() {
  const ref = useRef<THREE.Mesh>(null);
  const geometria = useMemo(() => {
    const g = new THREE.PlaneGeometry(520, 420, 80, 60);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const base = useMemo(() => Float32Array.from(geometria.attributes.position.array), [geometria]);

  useFrame((estado) => {
    if (reducirMovimiento) return;
    const t = estado.clock.elapsedTime;
    const pos = geometria.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      pos.setY(i, Math.sin(x * 0.18 + t * 0.9) * 0.28 + Math.cos(z * 0.22 + t * 0.7) * 0.22);
    }
    pos.needsUpdate = true;
    geometria.computeVertexNormals();
  });

  const centro = (ruta.length - 1) * 8;
  return (
    <mesh ref={ref} geometry={geometria} position={[centro, -0.55, -120]}>
      <meshLambertMaterial color={COLORES.mar} flatShading />
    </mesh>
  );
}

function Nube({ posicion, escala, velocidad }: { posicion: [number, number, number]; escala: number; velocidad: number }) {
  const ref = useRef<THREE.Group>(null);
  const ancho = (ruta.length - 1) * 16 + 80;
  useFrame((_, delta) => {
    if (!ref.current || reducirMovimiento) return;
    ref.current.position.x += delta * velocidad;
    if (ref.current.position.x > ancho) ref.current.position.x = -40;
  });
  return (
    <group ref={ref} position={posicion} scale={escala}>
      {[
        [0, 0, 0, 1.6],
        [1.6, -0.3, 0.3, 1.2],
        [-1.5, -0.4, -0.2, 1.1],
        [0.5, 0.7, -0.3, 1],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[r, 0]} />
          <meshLambertMaterial color="#ffffff" flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Personaje() {
  const ref = useRef<THREE.Group>(null);
  const cuerpo = useRef<THREE.Group>(null);
  const actual = useRef(new THREE.Vector3(...ruta[0].posicion));
  const anterior = useRef(new THREE.Vector3());

  useFrame((estado, delta) => {
    if (!ref.current || !cuerpo.current) return;
    const destino = curva.getPoint(parametroCurva(progresoScroll.valor));
    anterior.current.copy(actual.current);
    actual.current.lerp(destino, 1 - Math.exp(-delta * 5));
    const velocidad = anterior.current.distanceTo(actual.current) / Math.max(delta, 0.001);
    const enIsla = ruta.some(
      (p) => Math.hypot(p.posicion[0] - actual.current.x, p.posicion[2] - actual.current.z) < 5.5,
    );
    const suelo = enIsla ? 0.7 : 0.1;
    ref.current.position.set(actual.current.x + 1.6, suelo, actual.current.z + 2.4);
    const salto = reducirMovimiento ? 0 : Math.abs(Math.sin(estado.clock.elapsedTime * 9)) * Math.min(velocidad * 0.06, 0.6);
    cuerpo.current.position.y = salto;
    if (velocidad > 0.4) {
      const direccion = Math.atan2(destino.x - actual.current.x, destino.z - actual.current.z);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, direccion, 1 - Math.exp(-delta * 8));
    } else {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0.5, 1 - Math.exp(-delta * 3));
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18} />
      </mesh>
      <group ref={cuerpo}>
        <mesh position={[-0.18, 0.3, 0]}>
          <boxGeometry args={[0.24, 0.6, 0.28]} />
          <Material color={COLORES.tinta} />
        </mesh>
        <mesh position={[0.18, 0.3, 0]}>
          <boxGeometry args={[0.24, 0.6, 0.28]} />
          <Material color={COLORES.tinta} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[0.75, 0.8, 0.45]} />
          <Material color={COLORES.hoodie} />
        </mesh>
        <mesh position={[0, 1.66, 0]}>
          <boxGeometry args={[0.62, 0.62, 0.58]} />
          <Material color={COLORES.piel} />
        </mesh>
        <mesh position={[0, 2.04, -0.03]}>
          <icosahedronGeometry args={[0.42, 0]} />
          <Material color={COLORES.pelo} />
        </mesh>
        <mesh position={[0, 1.7, 0.3]}>
          <boxGeometry args={[0.56, 0.16, 0.03]} />
          <Material color={COLORES.tinta} />
        </mesh>
        <mesh position={[-0.14, 1.7, 0.31]}>
          <boxGeometry args={[0.16, 0.1, 0.02]} />
          <meshBasicMaterial color="#cfe6ff" />
        </mesh>
        <mesh position={[0.14, 1.7, 0.31]}>
          <boxGeometry args={[0.16, 0.1, 0.02]} />
          <meshBasicMaterial color="#cfe6ff" />
        </mesh>
        <mesh position={[0, 1.38, 0.3]}>
          <boxGeometry args={[0.04, 0.08, 0.02]} />
          <Material color={COLORES.moneda} />
        </mesh>
      </group>
    </group>
  );
}

function Camara() {
  const { camera, size } = useThree();
  const posicion = useRef(new THREE.Vector3(-8, 14, 22));
  const mira = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const punto = curva.getPoint(parametroCurva(progresoScroll.valor));
    const vertical = size.width < 768;
    const desplazamiento = vertical ? new THREE.Vector3(0, 17, 31) : new THREE.Vector3(-5, 11, 27);
    const foco = vertical ? new THREE.Vector3(0, -7.5, 0) : new THREE.Vector3(-9.5, 2.2, 0);
    const deseada = punto.clone().add(desplazamiento);
    const k = 1 - Math.exp(-delta * 3.2);
    posicion.current.lerp(deseada, k);
    mira.current.lerp(punto.clone().add(foco), k);
    camera.position.copy(posicion.current);
    camera.lookAt(mira.current);
  });
  return null;
}

export default function Mundo() {
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      camera={{ fov: 42, near: 0.5, far: 320, position: [-8, 14, 22] }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <fog attach="fog" args={["#d3e9f8", 55, 175]} />
      <hemisphereLight args={["#dff1ff", "#4c7d3a", 1.4]} />
      <directionalLight position={[-20, 30, 18]} intensity={1.9} color="#fff1dc" />
      <Oceano />
      <Piedras />
      {ruta.map((p) => (
        <Isla key={p.id} parada={p} />
      ))}
      <Personaje />
      <Nube posicion={[4, 13, -18]} escala={1.6} velocidad={0.6} />
      <Nube posicion={[30, 16, -26]} escala={2} velocidad={0.4} />
      <Nube posicion={[62, 12, -14]} escala={1.3} velocidad={0.7} />
      <Nube posicion={[90, 15, -22]} escala={1.8} velocidad={0.5} />
      <Camara />
    </Canvas>
  );
}
