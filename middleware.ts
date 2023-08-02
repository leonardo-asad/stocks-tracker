export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/dashboard/:path*", "/api/user/:path*"],
};
