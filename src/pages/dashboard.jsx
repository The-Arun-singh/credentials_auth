import { useSession } from 'next-auth/react';

const dashboard = () => {
    const { data: session, status } = useSession();

    console.log(session);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hi {session?.user.name}</p>
        </div>
    )
}

export default dashboard