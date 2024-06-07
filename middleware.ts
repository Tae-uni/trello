import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher([
  "/",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId, redirectToSignIn } = auth();

  if (!userId && req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // Redirect to sign-in if user is not auth and trying to access a protected route
  // In this case, all the routes are protected
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect to auth user's organization page or selection page
  if (userId && isProtectedRoute(req)) {
    let path = "/select-org";

    if (orgId) {
      path = `/organization/${orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Prevent unauth user's access
  if (!userId && !isProtectedRoute(req)) {
    return NextResponse.next();
  }

  // Redirect auth users without an organization ID to the organization selection page
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  // return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};