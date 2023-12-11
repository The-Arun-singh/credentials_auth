import bcrypt from "bcrypt";
import { prismaClient } from "../lib/prismaClient";


export default async function POST(req, res) {
    try {
        const body = req.body;
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return res.status(404).json({ message: "name or email or password is missing" });
        }

        const userExists = await prismaClient.user.findUnique({
            where: {
                email: email,
            }
        });

        if (userExists) return res.status(404).json({ message: "user already exists" });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                hashPassword
            }
        });

        return res.status(200).json(user, { message: "user Resgistered." })

    } catch (error) {
        res.json({ error: error.message });
    }
}