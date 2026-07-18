import fs from "node:fs";
import path from "node:path";

import { LiveMirrorRuntime } from "@/components/landing/LiveMirrorRuntime";
import { rewriteLandingCopy } from "@/components/landing/landingCopy";

export default function Home() {
  const source = fs.readFileSync(path.join(process.cwd(), "public", "mirror", "main.html"), "utf8");
  const html = rewriteLandingCopy(source);

  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
      <LiveMirrorRuntime />
    </>
  );
}
