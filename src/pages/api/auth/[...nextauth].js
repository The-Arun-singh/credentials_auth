import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/pages/lib/prismaClient";


export const authOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "asingh" },
                password: { label: "Password", type: "text" },
            },
            async authorize(credentials) {
                // check to see if the credentials are valid
                if (!credentials.email || !credentials.password) return null;

                // check if user exists
                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) return null;

                // check if password is matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashPassword);

                if (!passwordMatch) return null;

                return user;
            }
        })
    ],
    session: {
        stratagy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}


const handler = NextAuth(authOptions);

export default handler;