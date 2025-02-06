import "@/styles/globals.css";
import Header from "./components/Header";
import {QuizProvider} from "./context/QuizContext";
import Footer from "./components/Footer";

export default function App({Component, pageProps}) {
  return (
    <QuizProvider>
      <Header />
      <Component {...pageProps} />
    </QuizProvider>
  );
}
