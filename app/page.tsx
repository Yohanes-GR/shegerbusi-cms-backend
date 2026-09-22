export default function Home() {
  return (
    <pre>{JSON.stringify({ service: "cms-back", site: "/api/site", auth: "/api/auth/login" }, null, 2)}</pre>
  );
}
