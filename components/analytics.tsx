import Script from 'next/script';

// Public beacon token — it ships in the HTML anyway, so it is not a secret.
const CF_BEACON_TOKEN = 'fe81be42d9bc48df86a10a266a68ae22';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      type="module"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN, spa: true })}
    />
  );
}
