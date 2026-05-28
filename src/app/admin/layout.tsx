import AdminSidebar from "./_components/AdminSidebar";
import { ToastProvider } from "./_components/AdminToast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-crema-dark">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-12 pt-12 pb-16 pr-16">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
