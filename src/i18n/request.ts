import { getRequestConfig } from "next-intl/server";
import { Formats, hasLocale, Locale } from "next-intl";
import { routing } from "./routing";

export const getFormats = (locale: Locale): Formats => {
  return {
    number: {
      digit: {
        numberingSystem: locale === "ar" ? "arab" : "latn",
      },
    },
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: getFormats(locale),
  };
});
