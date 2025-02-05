import "@/styles/globals.css";
import Header from "./components/Header";
import { QuizProvider } from "./context/QuizContext";

export default function App({ Component, pageProps }) {
  return (
    <QuizProvider>
      <Header />
      <Component {...pageProps} />
    </QuizProvider>
  );
}
