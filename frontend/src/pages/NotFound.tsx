import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-4">
      <div className="text-6xl mb-4">😅</div>
      <h1 className="text-4xl font-bold text-pink-600 mb-2">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-600 mb-6">
        We couldn't find the page you're looking for. Maybe the bird flew away... 🐦💨
      </p>
      <Link
        to="/"
        className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded"
      >
        Go back home
      </Link>
    </div>
  )
}