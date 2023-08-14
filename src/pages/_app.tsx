import "@/styles/globals.css";
import axios from "axios";
import dayjs from "dayjs";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import hrLocale from "dayjs/locale/hr";

const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.params = {
  populate: "*",
};

dayjs.locale(hrLocale);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <Component {...pageProps} />
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}
