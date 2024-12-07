import { signOut } from "firebase/auth";
import { AuthProvider, useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import { auth } from "@/firebase/config";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>{children}</div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </AuthProvider>
  );
}
