
import React from "react";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
