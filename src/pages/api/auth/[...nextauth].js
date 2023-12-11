import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/pages/lib/prismaClient";


export const authOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "text" },
            },
            async authorize(credentials) {
                try {
                    // Validate credentials
                    if (!credentials.email || !credentials.password) {
                        return new Error("Invalid credentials");
                    }

                    // Check user existence
                    const user = await prismaClient.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    if (!user) {
                        return new Error("User not found");
                    }

                    // Verify password
                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        user.hashPassword
                    );

                    if (!passwordMatch) {
                        return new Error("Invalid password");
                    }

                    return user;
                } catch (error) {
                    console.error(error);
                    return error;
                }
            }

        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}


const handler = NextAuth(authOptions);

export default handler;