export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Estrae il nome del pacchetto dall'URL (es. /packages/mia-app)
    const pathParts = url.pathname.split("/").filter(Boolean);

    if (pathParts[0] !== "packages" || !pathParts[1]) {
      return new Response("Uso corretto: /packages/<nome-pacchetto>", { status: 400 });
    }

    const packageName = pathParts[1];
    
    // Punta al file binario C compilato su GitHub
    const rawGithubUrl = `https://raw.githubusercontent.com/hi-its-matte/fs4p/main/packages/${packageName}/${packageName}.bin`;

    const response = await fetch(rawGithubUrl);

    if (!response.ok) {
      return new Response(`Pacchetto '${packageName}' non trovato.`, { status: 404 });
    }

    // Restituisce il binario C compilato
    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": "application/octet-stream",
        "cache-control": "no-cache",
      },
    });
  },
};