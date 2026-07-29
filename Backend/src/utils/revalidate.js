// Notifies the Next.js frontend to instantly refresh a cached page after
// the admin creates/updates/deletes a category or product (on-demand ISR).
async function triggerRevalidate(paths = []) {
  const url = process.env.FRONTEND_REVALIDATE_URL;
  const secret = process.env.REVALIDATE_SECRET;

  if (!url || !secret) {
    console.warn("[Revalidate] Skipped — FRONTEND_REVALIDATE_URL or REVALIDATE_SECRET not set");
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, paths }),
    });
    console.log("[Revalidate] Triggered for:", paths.join(", "));
  } catch (err) {
    // Non-fatal — time-based ISR on the frontend is the fallback safety net.
    console.error("[Revalidate] Failed:", err.message);
  }
}

module.exports = triggerRevalidate;