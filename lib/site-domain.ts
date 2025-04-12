import { getSiteUrl } from "@/lib/site-url";

export const domainWorkup = (
  url:ReturnType<typeof getSiteUrl>
) => {
  const omitProtocol =
    url
      .split(/(https?:\/\/)/g)
      ?.filter(t => t.length > 1)
      ?.filter(t => /(https?:\/\/)/g.test(t) === false)?.[0] ?? "";
  return /(?:(localhost:)[0-9]{3,5}$)/g.test(omitProtocol)
    ? "localhost"
    : /(:?r3f-elevator\.vercel\.app)/g.test(omitProtocol)
      ? "r3f-elevator.vercel.app"
      : (process.env.VERCEL_URL ?? "");
};

export const getDomain = domainWorkup(getSiteUrl(process.env.NODE_ENV));

export const getCookieDomain = () => {
  const domain = domainWorkup(getSiteUrl(process.env.NODE_ENV));
  // leading dot for cookie domain so it works across subdomains
  if (domain.endsWith("r3f-elevator.vercel.app")) return ".r3f-elevator.vercel.app";
  else if (domain === "localhost") return "localhost";
  else return domain;
};
