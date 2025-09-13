"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Layout, Sparkles, Zap, Grid, Layers } from "lucide-react"

interface LayoutTemplate {
  id: string
  name: string
  description: string
  category: "corporate" | "modern" | "creative" | "minimal"
  preview: string
  sections: Array<{
    type: string
    layout: string
    styles: any
  }>
}

interface LayoutTemplatesProps {
  onTemplateSelect: (template: LayoutTemplate) => void
}

export function LayoutTemplates({ onTemplateSelect }: LayoutTemplatesProps) {
  const templates: LayoutTemplate[] = [
    {
      id: "corporate-classic",
      name: "Corporate Classic",
      description: "Traditional professional layout with clean sections",
      category: "corporate",
      preview: "/placeholder.svg?height=120&width=200&text=Corporate+Classic",
      sections: [
        {
          type: "hero",
          layout: "full",
          styles: {
            backgroundColor: "#ffffff",
            textColor: "#1f2937",
            fontSize: 18,
            padding: 48,
            blur: 0,
          },
        },
        {
          type: "services",
          layout: "split",
          styles: {
            backgroundColor: "#f8fafc",
            textColor: "#374151",
            fontSize: 16,
            padding: 32,
            blur: 0,
          },
        },
        {
          type: "contact",
          layout: "full",
          styles: {
            backgroundColor: "#059669",
            textColor: "#ffffff",
            fontSize: 16,
            padding: 40,
            blur: 0,
          },
        },
      ],
    },
    {
      id: "modern-gradient",
      name: "Modern Gradient",
      description: "Contemporary design with gradient backgrounds",
      category: "modern",
      preview: "/placeholder.svg?height=120&width=200&text=Modern+Gradient",
      sections: [
        {
          type: "hero",
          layout: "centered",
          styles: {
            backgroundColor: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            textColor: "#ffffff",
            fontSize: 20,
            padding: 60,
            blur: 0,
          },
        },
        {
          type: "content",
          layout: "diagonal",
          styles: {
            backgroundColor: "#ffffff",
            textColor: "#1f2937",
            fontSize: 16,
            padding: 36,
            blur: 0,
          },
        },
      ],
    },
    {
      id: "creative-angles",
      name: "Creative Angles",
      description: "Dynamic layout with angled sections and overlays",
      category: "creative",
      preview: "/placeholder.svg?height=120&width=200&text=Creative+Angles",
      sections: [
        {
          type: "hero",
          layout: "diagonal",
          styles: {
            backgroundColor: "#1f2937",
            textColor: "#ffffff",
            fontSize: 18,
            padding: 40,
            blur: 0,
          },
        },
        {
          type: "services",
          layout: "diagonal",
          styles: {
            backgroundColor: "#f59e0b",
            textColor: "#1f2937",
            fontSize: 16,
            padding: 32,
            blur: 0,
          },
        },
      ],
    },
    {
      id: "minimal-clean",
      name: "Minimal Clean",
      description: "Simple, clean design with lots of white space",
      category: "minimal",
      preview: "/placeholder.svg?height=120&width=200&text=Minimal+Clean",
      sections: [
        {
          type: "hero",
          layout: "centered",
          styles: {
            backgroundColor: "#ffffff",
            textColor: "#374151",
            fontSize: 16,
            padding: 80,
            blur: 0,
          },
        },
        {
          type: "content",
          layout: "full",
          styles: {
            backgroundColor: "#fafafa",
            textColor: "#4b5563",
            fontSize: 14,
            padding: 60,
            blur: 0,
          },
        },
      ],
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "corporate":
        return <Grid className="h-4 w-4" />
      case "modern":
        return <Zap className="h-4 w-4" />
      case "creative":
        return <Sparkles className="h-4 w-4" />
      case "minimal":
        return <Layers className="h-4 w-4" />
      default:
        return <Layout className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "corporate":
        return "bg-blue-100 text-blue-800"
      case "modern":
        return "bg-purple-100 text-purple-800"
      case "creative":
        return "bg-orange-100 text-orange-800"
      case "minimal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Layout className="h-5 w-5" />
          Layout Templates
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-1 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => onTemplateSelect(template)}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-16 h-12 object-cover rounded border"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{template.name}</h3>
                      <Badge variant="secondary" className={`text-xs ${getCategoryColor(template.category)}`}>
                        {getCategoryIcon(template.category)}
                        <span className="ml-1 capitalize">{template.category}</span>
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{template.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{template.sections.length} sections</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                      >
                        Apply Template
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
