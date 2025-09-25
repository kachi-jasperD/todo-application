import Link from "next/link";

function NavBar() {
  return (
    <nav className="max-w-3l mx-auto py-4 px-10 flex justify-end gap-x-4">
      <Link href="/">Logout</Link>
    </nav>
  );
}
export default NavBar;
