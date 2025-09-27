import { Helmet } from "react-helmet-async";
import { SEO } from "../services/SEO";

export default function PageSEO({ page }) {
  const seo = SEO[page] || {
    title: "MeetConnect",
    description: "Connect, manage, and grow with MeetConnect.",
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Helmet>
  );
}
