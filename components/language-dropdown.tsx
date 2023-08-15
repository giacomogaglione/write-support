"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageDropdown() {
  const router = useRouter()
  const [language, setLanguage] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {languageList
            .sort((a, b) => (a.value > b.value ? 1 : -1))
            .map((language, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={language.value}
                className="cursor-pointer space-x-1"
                onClick={() => router.push("/" + language.value)}
              >
                <span>{language.name}</span>
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const languageList = [
  {
    value: "en",
    name: "🇺🇸 English",
  },
  {
    value: "it",
    name: "it Italian",
  },
  {
    value: "de",
    name: "🇩🇪 Deutsch",
  },
  {
    value: "fr",
    name: "🇫🇷 Français",
  },
  {
    value: "es",
    name: "🇪🇸 Español",
  },
]
