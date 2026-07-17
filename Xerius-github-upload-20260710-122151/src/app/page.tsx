import fs from "node:fs";
import path from "node:path";

import { LiveMirrorRuntime } from "@/components/landing/LiveMirrorRuntime";

export default function Home() {
  const html = fs.readFileSync(path.join(process.cwd(), "public", "mirror", "main.html"), "utf8");

  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
      <LiveMirrorRuntime />
    </>
  );
}
