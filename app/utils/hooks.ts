import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
    const session = await auth(); // This step protect our dashboard to opening from others

    if(!session?.user){
        redirect("/login");
    }

    return session;
}