import { ShieldUser } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 px-8 bg-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <img 
              src="/615b06fa5951c1d2725f5a8d_logo.svg" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </a>
        </div>
        <a href="/admin" className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-white w-8 h-8">
              <ShieldUser className="text-purple-variant" />
          </div>
        </a>
      </div>
    </header>
  )
}