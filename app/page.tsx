import "./page.scss";
import { redirect } from "next/navigation";


export default function Home() {
 redirect("/notes");
}
