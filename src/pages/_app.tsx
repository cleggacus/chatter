import "../styles/globals/index.scss";

import { withTRPC } from '@trpc/next';
import { AppRouter } from '../server/route/app.router';
import { loggerLink } from "@trpc/client/links/loggerLink"
import { httpBatchLink } from "@trpc/client/links/httpBatchLink"
import { Page } from "../../types/page";
import { AppProps } from "next/app";
import { FC, ReactNode } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";

type Props = AppProps & {
  Component: Page
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const Layout = Component.Layout || DefaultLayout;

  return <Layout>
    <Component {...pageProps} />
  </Layout>
};

export default withTRPC<AppRouter>({
  config ({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URLVERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url
      })
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          }
        }
      },
      headers() {
        if(ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1"
          }
        }

        return {};
      },
      links,
      ssr: false
    };
  },
  ssr: true,
})(MyApp);