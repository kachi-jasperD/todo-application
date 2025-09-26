// import Link from "next/link";

// function NavBar() {
//   return (
//     <nav className="max-w-3l mx-auto py-4 px-10 flex justify-end gap-x-4">
//       <Link href="/">Logout</Link>
//     </nav>
//   );
// }
// export default NavBar;


"use client";

import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call logout API to clear cookie
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/"); // Redirect to login
  };

  return (
    <nav className="max-w-3l mx-auto py-4 px-10 flex justify-end gap-x-4">
      <button onClick={handleLogout} className="text-blue-600 hover:underline">
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
