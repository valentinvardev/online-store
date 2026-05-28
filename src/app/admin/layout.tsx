import { ToastProvider } from "./_components/AdminToast";
import AdminTopBar from "./_components/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-crema-dark flex flex-col">
        <AdminTopBar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ToastProvider>
  );
}
