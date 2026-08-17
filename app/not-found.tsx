export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#FCFBF8",
        color: "#12332C",
        fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
        textAlign: "center",
        padding: "48px 24px",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontSize: "clamp(64px, 12vw, 120px)",
            lineHeight: 1,
            margin: "0 0 16px",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 400,
            fontSize: "clamp(22px, 3vw, 32px)",
            margin: "0 0 12px",
          }}
        >
          This page has moved
        </h1>
        <p style={{ color: "#59635D", maxWidth: "46ch", margin: "0 auto 28px" }}>
          The page you are looking for no longer exists. Every TIB HIND page now
          lives at a stable address — start again from the homepage or the
          treatments index.
        </p>
        <p style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "15px 26px",
              background: "#12332C",
              color: "#FCFBF8",
              textDecoration: "none",
              borderRadius: "2px",
              fontSize: "16px",
            }}
          >
            Homepage
          </a>
          <a
            href="/treatments/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "15px 26px",
              border: "1px solid #12332C",
              color: "#12332C",
              textDecoration: "none",
              borderRadius: "2px",
              fontSize: "16px",
            }}
          >
            All treatments
          </a>
        </p>
      </div>
    </div>
  );
}
