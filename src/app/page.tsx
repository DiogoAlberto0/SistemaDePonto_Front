import { redirect } from "next/navigation";

export default async function Home() {

  redirect('/signin')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world</h1>
    </main>
  );
}
