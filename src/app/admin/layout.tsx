import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import AdminSidebar from "./_components/AdminSidebar";

const ADMIN_EMAIL = "valentinvarela0508@gmail.com";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/api/auth/signin");
  if (session.user.email !== ADMIN_EMAIL) redirect("/");

  return (
    <div className="flex min-h-screen bg-crema/60">
      <AdminSidebar />
      <main className="flex-1 px-10 py-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
