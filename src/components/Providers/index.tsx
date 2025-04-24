
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query.provider";
import QuizResultProvider from "./components/result-context.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {


  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <QuizResultProvider>{children}</QuizResultProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
