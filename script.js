/* ─────────────────────────────────────────
   MAsipOri — script.js
   ───────────────────────────────────────── */

/* ════════════════════════════════════════
   ✏️  BAGIAN YANG PERLU KAMU ISI
   ════════════════════════════════════════

   1. LINKS  → isi URL lengkap akun kamu
   2. USERNAMES → isi username (tanpa @)
      untuk foto profil otomatis

   ════════════════════════════════════════ */

const LINKS = {
  /* Contoh: "https://youtube.com/@NamaChannel" */
  youtube:  "https://youtube.com/@masipori",

  /* Contoh: "https://tiktok.com/@NamaAkun" */
  tiktok:   "https://www.tiktok.com/@masiporigin",

  /* Contoh: "https://saweria.co/NamaAkun" */
  donate1:  "https://saweria.co/MasipOri",

  /* Contoh: "https://trakteer.id/NamaAkun" */
  donate2:  "https://trakteer.id/MAsipOri/gift",
};

const USERNAMES = {
  /*
   * YouTube channel handle / username (tanpa @)
   * Contoh: "MrBeast" → foto profil channel MrBeast
   * Bisa pakai handle (@NamaKamu → tulis "NamaKamu")
   * atau Channel ID (UCxxxxxx)
   */
  youtube: "@MAsipOri",

  /*
   * TikTok username (tanpa @)
   * Contoh: "charlidamelio"
   */
  tiktok:  "masiporigin",
};

/* ════════════════════════════════════════
   Jangan ubah kode di bawah ini
   kecuali kamu tahu yang kamu lakukan :)
   ════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. Inject links ke semua card ── */
  const cardMap = {
    "card--youtube":  LINKS.youtube,
    "card--tiktok":   LINKS.tiktok,
    "card--donate1":  LINKS.donate1,
    "card--donate2":  LINKS.donate2,
  };

  document.querySelectorAll("a.card").forEach((card) => {
    for (const [cls, url] of Object.entries(cardMap)) {
      if (card.classList.contains(cls)) {
        card.href = url;
        break;
      }
    }
  });

  /* ── 2. Load foto profil YouTube ── */
  const ytUser = USERNAMES.youtube;
  const ytImg  = document.getElementById("yt-avatar");

  if (ytImg && !ytUser.startsWith("ISI_")) {
    /*
     * Gunakan unavatar.io — service gratis yang auto-fetch
     * foto profil terbaru langsung dari YouTube.
     */
    ytImg.src = `https://unavatar.io/youtube/${encodeURIComponent(ytUser)}`;
  } else if (ytImg) {
    /* Username belum diisi → tampilkan fallback SVG */
    ytImg.style.display = "none";
    const fallback = ytImg.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  }

  /* ── 3. Load foto profil TikTok ── */
  const ttUser = USERNAMES.tiktok;
  const ttImg  = document.getElementById("tt-avatar");

  if (ttImg && !ttUser.startsWith("ISI_")) {
    /*
     * Gunakan unavatar.io — sama seperti YouTube,
     * foto profil TikTok diambil langsung dari platform.
     */
    ttImg.src = `https://unavatar.io/tiktok/${encodeURIComponent(ttUser)}`;
  } else if (ttImg) {
    ttImg.style.display = "none";
    const fallback = ttImg.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  }

  /* ── 4. Link guard: peringatan kalau link belum diisi ── */
  document.querySelectorAll("a.card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (card.href.includes("#LINK_")) {
        e.preventDefault();
        const label = card.dataset.label || "Link ini";
        alert(`⚠️ ${label} belum diatur.\n\nBuka script.js dan isi URL-nya di bagian LINKS.`);
      }
    });
  });

  /* ── 5. Ripple effect saat tap/klik ── */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("a.card").forEach((card) => {
      card.addEventListener("pointerdown", (e) => {
        const existing = card.querySelector(".ripple");
        if (existing) existing.remove();

        const rect   = card.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height) * 1.6;
        const x      = e.clientX - rect.left - size / 2;
        const y      = e.clientY - rect.top  - size / 2;

        const ripple = document.createElement("span");
        ripple.className = "ripple";
        Object.assign(ripple.style, {
          position:      "absolute",
          width:         `${size}px`,
          height:        `${size}px`,
          left:          `${x}px`,
          top:           `${y}px`,
          borderRadius:  "50%",
          background:    "rgba(255,255,255,.07)",
          transform:     "scale(0)",
          animation:     "ripple-anim .5s ease-out forwards",
          pointerEvents: "none",
        });

        card.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
      });
    });

    /* Inject keyframe sekali */
    if (!document.getElementById("ripple-style")) {
      const s = document.createElement("style");
      s.id = "ripple-style";
      s.textContent = `@keyframes ripple-anim { to { transform: scale(1); opacity: 0; } }`;
      document.head.appendChild(s);
    }
  }

});
