import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { getSession } from "./lib/session";
console.log("middleware");

interface PublicOnlyUrl {
  [key: string]: boolean;
}

const pulicOnlyUrl: PublicOnlyUrl = {
  "/log-in": true,
  "/create-account": true,
};

export const middleware: NextMiddleware = async (req, event) => {
  const session = await getSession();
  const accessingPublicPage = pulicOnlyUrl[req.nextUrl.pathname];
  if (!session.id && !accessingPublicPage) {
    return NextResponse.redirect(new URL("/create-account", req.nextUrl.origin));
  }
  if (session.id && accessingPublicPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
