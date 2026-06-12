// Marketing home page. The design is a complete, self-contained HTML document
// (its own Fraunces/Inter fonts, styles and reveal script) living in
// public/home.html — rendered full-viewport here so it stays pixel-perfect and
// its CSS never collides with the Tailwind phone-app screens.
//
// Its CTAs (target="_top") navigate into the phone demo at /clinic and /passport.
export function Home() {
  return (
    <iframe
      src="/home.html"
      title="XeivoraMed — Verified patient data infrastructure"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
