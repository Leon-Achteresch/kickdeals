import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );


    const user = await supabase.auth.getUser();

    // protected routes
    // if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
    //   return NextResponse.redirect(new URL("/sign-in", request.url));
    // }
    const url = request.url;
    const pathname = url.split('/').findLast((item) => item);
    response.headers.append("x-url", pathname || "");

    if (request.nextUrl.pathname === "/sign-in" && !user.error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (e) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    console.log('error');
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
};
