import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "./login/page";

export default async function Home() {

    const session = await getServerSession();
    
    if(session) {
        redirect('/estudante');
    }

    return (
        <div>
            <LoginPage />
        </div>
    );
}