import { getSiteUrl } from "@/lib/site-url";

export const domainWorkup = (
  url:
    | "https://test.r3f.asross.com"
    | "http://localhost:3007"
    | "https://dev.test.r3f.asross.com"
) => {
  const omitProtocol =
    url
      .split(/(https?:\/\/)/g)
      ?.filter(t => t.length > 1)
      ?.filter(t => /(https?:\/\/)/g.test(t) === false)?.[0] ?? "";
  return /(?:(localhost:)[0-9]{3,5}$)/g.test(omitProtocol)
    ? "localhost"
    : /(:?asross\.com)/g.test(omitProtocol)
      ? "asross.com"
      : (process.env.VERCEL_URL ?? "");
};

export const getDomain = domainWorkup(getSiteUrl(process.env.NODE_ENV));

export const getCookieDomain = () => {
  const domain = domainWorkup(getSiteUrl(process.env.NODE_ENV));
  // leading dot for cookie domain so it works across subdomains
  if (domain.endsWith("asross.com")) return ".asross.com";
  else if (domain === "localhost") return "localhost";
  else return domain;
};
