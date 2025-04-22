
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/Layout";
import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  phone?: string | null;
  address?: string | null;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*");

        if (error) {
          throw error;
        }

        setUsers((data as UserRow[]) || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    if (roleFilter === "all") return matchesSearch;
    return (
      matchesSearch && user.role.toLowerCase() === roleFilter.toLowerCase()
    );
  });

  const handleDeleteUser = async (userId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", userId);

        if (error) throw error;

        setUsers(users.filter((user) => user.id !== userId));

        toast({
          title: "User Deleted",
          description: "User has been successfully deleted",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option value="all">All Users</option>
              <option value="admin">Admins</option>
              <option value="customer">Customers</option>
            </select>
            <Filter
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>

          <Button
            className="bg-gold hover:bg-gold-dark text-white"
            onClick={() => navigate("/admin/users/new")}
          >
            <Plus size={18} className="mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{user.name || "N/A"}</td>
                    <td className="py-3 px-4">{user.email || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          onClick={() =>
                            navigate(`/admin/users/edit/${user.id}`)
                          }
                        >
                          <Edit size={18} className="text-blue-500" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
