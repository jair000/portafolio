import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.env.PREVIEW_URL ?? "http://localhost:8790/next-portafolio/";
const salida = process.env.CAPTURAS_DIR ?? path.join(process.cwd(), ".capturas");
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
await mkdir(salida, { recursive: true });

const vistas = [
  { nombre: "escritorio", width: 1440, height: 900 },
  { nombre: "movil", width: 390, height: 844, isMobile: true },
];
const navegador = await chromium.launch({ executablePath: chrome, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
for (const v of vistas) {
  const pagina = await navegador.newPage({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile ?? false, hasTouch: v.isMobile ?? false });
  const errores = [];
  pagina.on("pageerror", (e) => errores.push(String(e)));
  pagina.on("console", (m) => m.type() === "error" && errores.push(m.text()));
  await pagina.goto(base, { waitUntil: "networkidle" });
  await pagina.waitForTimeout(2500);
  const ids = await pagina.$$eval("main > section", (s) => s.map((x) => x.id));
  for (const id of ids) {
    await pagina.evaluate((id) => {
      const el = document.getElementById(id);
      window.scrollTo({ top: el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2, behavior: "instant" });
    }, id);
    await pagina.waitForTimeout(2600);
    await pagina.screenshot({ path: path.join(salida, `${v.nombre}-${id}.png`) });
  }
  console.log(v.nombre, "secciones:", ids.join(","), "errores:", errores.length ? errores.slice(0, 5) : "ninguno");
  await pagina.close();
}
await navegador.close();
