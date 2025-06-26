import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HVAC AI Assistant Demo",
  description: "Interactive demo of the HVAC AI Assistant with natural language processing",
}

export default function AIDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}