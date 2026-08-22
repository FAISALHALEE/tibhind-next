/* Frees port 3000 before `npm run dev` starts, so the dev server
 * always binds to http://localhost:3000 instead of drifting to
 * another port. Runs automatically via the "predev" npm hook.
 */
const { execSync } = require("child_process");

function freePort(port) {
  try {
    const out = execSync("netstat -ano -p tcp", { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.split("\n")) {
      const m = line.trim().match(/^TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)$/i);
      if (m && Number(m[1]) === port) pids.add(m[2]);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`[predev] freed port ${port} (stopped old process ${pid})`);
      } catch {}
    }
  } catch {}
}

freePort(3000);
