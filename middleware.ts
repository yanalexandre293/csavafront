import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // Obtém o token JWT do NextAuth
    const token = await getToken({ req });

    // Rotas protegidas
    const protectedRoutes = ["/estudante", "/professor"];

    // Se o usuário tentar acessar uma rota protegida sem token, redireciona para o login
    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/estudante/:path*", "/professor/:path*"], // Protege todas as subpáginas
};
