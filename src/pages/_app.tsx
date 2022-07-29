import "../styles/globals/index.scss";

import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '../server/route/app.router';
import { loggerLink } from "@trpc/client/links/loggerLink"
import { httpBatchLink } from "@trpc/client/links/httpBatchLink"

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
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