import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";
import ReactQueryProvider from "./components/react-query.provider";
import NextAuthProvider from "./components/next-auth.provider";
import QuizResultProvider from "./components/result-context.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // Translaions
  const messages = useMessages();
  const locale = useLocale();
  const now = useNow();
  const timeZone = useTimeZone();

  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone={timeZone}>
          <QuizResultProvider>{children}</QuizResultProvider>
        </NextIntlClientProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
