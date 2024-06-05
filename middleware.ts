import { clerkMiddleware } from "@clerk/nextjs/server";

const secretKey = process.env.CLERK_SECRET_KEY;

if (!secretKey) {
  throw new Error('@clerk/nextjs: Missing secretKey.')
}

export default clerkMiddleware({ secretKey });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};