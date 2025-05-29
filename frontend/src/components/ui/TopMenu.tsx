import { Link, useLocation } from "react-router-dom"
import { Home, PencilLine, UserCircle } from "lucide-react"
import clsx from "clsx"

const navItems = [
  { to: "/feed", label: "Feed", icon: Home },
  { to: "/newpost", label: "New Post", icon: PencilLine },
  { to: "/profile", label: "Profile", icon: UserCircle },
]

export default function TopMenu() {
  const { pathname } = useLocation()

  return (
    <nav className="flex space-x-6 p-4 border-b shadow-sm items-center">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={clsx(
            "flex items-center gap-2 text-sm font-medium hover:text-blue-600",
            pathname === to && "text-blue-600 font-bold"
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  )
}