import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting…",
  robots: { index: false, follow: true },
  alternates: { canonical: "/hospitals/" },
};

export default function HospitalAliasPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/hospitals/" />
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "48px 24px", textAlign: "center" }}>
        <p>
          Redirecting to the{" "}
          <a href="/hospitals/" style={{ color: "#12332C" }}>
            hospitals index
          </a>
          …
        </p>
      </div>
    </>
  );
}
