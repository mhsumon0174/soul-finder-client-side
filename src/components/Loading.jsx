import { Loader2 } from "lucide-react"

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg font-medium animate-pulse">{message}</p>
    </div>
  )
}
