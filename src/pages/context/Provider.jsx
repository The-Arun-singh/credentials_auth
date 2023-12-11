"use client"

import { SessionProvider } from "next-auth/react"

export default function Provider({ children, sessionData }) {
    return (
        <SessionProvider session={sessionData} >
            {children}
        </SessionProvider>
    )
}
