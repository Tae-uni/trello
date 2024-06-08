import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the public routes
const isPublicRoute = createRouteMatcher([
  "/",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId, redirectToSignIn } = auth();

  // "/" 경로는 공개 경로로 설정
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // 인증되지 않은 사용자가 보호된 경로에 접근하려고 할 때 로그인 페이지로 리다이렉션
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // 인증된 사용자가 조직 ID가 없는 경우 조직 선택 페이지로 리다이렉션
  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  // 인증된 사용자가 조직 ID가 있는 경우 해당 조직 페이지로 리다이렉션
  if (userId && orgId && req.nextUrl.pathname !== `/organization/${orgId}`) {
    return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
  }

  // 최종적으로 요청을 통과시킴
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};