import { authMiddleware } from "@clerk/nextjs"
import createMiddleware from "next-intl/middleware"

const locales = ["en", "it"]
const publicRoutes = ["/", "/api/generate", "/api/save", "/sign-in", "/sign-up", "/adhd", "/it", "/en"]

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en"
})

export default authMiddleware({
  beforeAuth: (req) => {
    const res = intlMiddleware(req);
    console.log(res);
    return res;
  },
  publicRoutes
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};