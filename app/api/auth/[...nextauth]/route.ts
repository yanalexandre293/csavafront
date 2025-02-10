import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async signIn({ user }) {
            try {
                await axios.get(`http://localhost:5147/Estudante/getByEmail/${user.email}`)
                    .then(res => {
                        if (!res.data === null) {
                                return false;
                        }
                    });

                await axios.post("http://localhost:5147/Estudante", {
                    Nome: user.name,
                    Email: user.email,
                    Senha: "",
                })
                .then(res => {
                    if (res.status === 200) return true;
                });
            } catch (error) {
                console.error("Erro de conexão com o backend:", error);
                return false;
            }

            return true;
        },
    },
});

export { handler as GET, handler as POST };