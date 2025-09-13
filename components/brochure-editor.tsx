"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash2,
  ImageIcon,
  Layout,
  Type,
  Palette,
  Upload,
  Eye,
  EyeOff,
  Copy,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface BrochureData {
  title: string
  subtitle: string
  sections: Array<{
    id: string
    type: string
    title: string
    content: string
    backgroundImage: string | null
    layout: string
    visible: boolean
    styles: {
      backgroundColor: string
      textColor: string
      fontSize: number
      padding: number
      blur: number
    }
  }>
}

interface BrochureEditorProps {
  data: BrochureData
  onChange: (data: BrochureData) => void
}

export function BrochureEditor({ data, onChange }: BrochureEditorProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(data.sections[0]?.id || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateData = (updates: Partial<BrochureData>) => {
    onChange({ ...data, ...updates })
  }

  const updateSection = (sectionId: string, updates: any) => {
    const updatedSections = data.sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section,
    )
    updateData({ sections: updatedSections })
  }

  const updateSectionStyles = (sectionId: string, styleUpdates: any) => {
    const updatedSections = data.sections.map((section) =>
      section.id === sectionId ? { ...section, styles: { ...section.styles, ...styleUpdates } } : section,
    )
    updateData({ sections: updatedSections })
  }

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      type: "content",
      title: "New Section",
      content: "Add your content here...",
      backgroundImage: null,
      layout: "full",
      visible: true,
      styles: {
        backgroundColor: "#ffffff",
        textColor: "#475569",
        fontSize: 16,
        padding: 32,
        blur: 0,
      },
    }
    updateData({ sections: [...data.sections, newSection] })
    setSelectedSection(newSection.id)
  }

  const duplicateSection = (sectionId: string) => {
    const sectionToDuplicate = data.sections.find((s) => s.id === sectionId)
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: Date.now().toString(),
        title: `${sectionToDuplicate.title} (Copy)`,
      }
      const sectionIndex = data.sections.findIndex((s) => s.id === sectionId)
      const updatedSections = [
        ...data.sections.slice(0, sectionIndex + 1),
        duplicatedSection,
        ...data.sections.slice(sectionIndex + 1),
      ]
      updateData({ sections: updatedSections })
    }
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const currentIndex = data.sections.findIndex((s) => s.id === sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= data.sections.length) return

    const updatedSections = [...data.sections]
    const [movedSection] = updatedSections.splice(currentIndex, 1)
    updatedSections.splice(newIndex, 0, movedSection)
    updateData({ sections: updatedSections })
  }

  const deleteSection = (sectionId: string) => {
    const updatedSections = data.sections.filter((section) => section.id !== sectionId)
    updateData({ sections: updatedSections })
    if (selectedSection === sectionId) {
      setSelectedSection(updatedSections[0]?.id || null)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && selectedSection) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        updateSection(selectedSection, { backgroundImage: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const selectedSectionData = data.sections.find((s) => s.id === selectedSection)

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Brochure Editor
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="general" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="general" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">
                      Company Name
                    </Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => updateData({ title: e.target.value })}
                      placeholder="Your Company Name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle" className="text-sm font-medium">
                      Tagline
                    </Label>
                    <Input
                      id="subtitle"
                      value={data.subtitle}
                      onChange={(e) => updateData({ subtitle: e.target.value })}
                      placeholder="Your company tagline"
                      className="mt-1"
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={addSection}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Section
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="sections" className="h-full">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Sections ({data.sections.length})</h3>
                  <Button size="sm" onClick={addSection}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-2 mb-4">
                    {data.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedSection === section.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedSection(section.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{section.title}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                updateSection(section.id, { visible: !section.visible })
                              }}
                            >
                              {section.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            </Button>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                moveSection(section.id, "up")
                              }}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                moveSection(section.id, "down")
                              }}
                              disabled={index === data.sections.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                duplicateSection(section.id)
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteSection(section.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="bg-muted px-2 py-1 rounded">{section.type}</span>
                          <span className="bg-muted px-2 py-1 rounded">{section.layout}</span>
                          {section.backgroundImage && (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">Has Image</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedSectionData && (
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-medium">Edit Section</h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Section Type</Label>
                          <Select
                            value={selectedSectionData.type}
                            onValueChange={(value) => updateSection(selectedSection!, { type: value })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hero">Hero</SelectItem>
                              <SelectItem value="content">Content</SelectItem>
                              <SelectItem value="services">Services</SelectItem>
                              <SelectItem value="contact">Contact</SelectItem>
                              <SelectItem value="testimonial">Testimonial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Layout</Label>
                          <Select
                            value={selectedSectionData.layout}
                            onValueChange={(value) => updateSection(selectedSection!, { layout: value })}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full Width</SelectItem>
                              <SelectItem value="split">Split</SelectItem>
                              <SelectItem value="diagonal">Diagonal Split</SelectItem>
                              <SelectItem value="centered">Centered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={selectedSectionData.title}
                          onChange={(e) => updateSection(selectedSection!, { title: e.target.value })}
                          className="h-8 mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Content</Label>
                        <Textarea
                          value={selectedSectionData.content}
                          onChange={(e) => updateSection(selectedSection!, { content: e.target.value })}
                          rows={3}
                          className="mt-1 text-sm"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Visible</Label>
                        <Switch
                          checked={selectedSectionData.visible}
                          onCheckedChange={(checked) => updateSection(selectedSection!, { visible: checked })}
                        />
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="design" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Background Images
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>

                      {selectedSectionData?.backgroundImage && (
                        <div className="relative">
                          <img
                            src={selectedSectionData.backgroundImage || "/placeholder.svg"}
                            alt="Background"
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1"
                            onClick={() => updateSection(selectedSection!, { backgroundImage: null })}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Layout className="h-4 w-4" />
                      Layout Templates
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Corporate
                      </Button>
                      <Button variant="outline" size="sm">
                        Modern
                      </Button>
                      <Button variant="outline" size="sm">
                        Creative
                      </Button>
                      <Button variant="outline" size="sm">
                        Minimal
                      </Button>
                      <Button variant="outline" size="sm">
                        Tech
                      </Button>
                      <Button variant="outline" size="sm">
                        Healthcare
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="styles" className="h-full">
              <ScrollArea className="h-full pr-4">
                {selectedSectionData ? (
                  <div className="space-y-6">
                    <h3 className="font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Style Section: {selectedSectionData.title}
                    </h3>

                    <div>
                      <Label className="text-xs">Background Color</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="color"
                          value={selectedSectionData.styles.backgroundColor}
                          onChange={(e) => updateSectionStyles(selectedSection!, { backgroundColor: e.target.value })}
                          className="w-12 h-8 p-1 border rounded"
                        />
                        <Input
                          value={selectedSectionData.styles.backgroundColor}
                          onChange={(e) => updateSectionStyles(selectedSection!, { backgroundColor: e.target.value })}
                          className="flex-1 h-8 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Text Color</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="color"
                          value={selectedSectionData.styles.textColor}
                          onChange={(e) => updateSectionStyles(selectedSection!, { textColor: e.target.value })}
                          className="w-12 h-8 p-1 border rounded"
                        />
                        <Input
                          value={selectedSectionData.styles.textColor}
                          onChange={(e) => updateSectionStyles(selectedSection!, { textColor: e.target.value })}
                          className="flex-1 h-8 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Font Size: {selectedSectionData.styles.fontSize}px</Label>
                      <Slider
                        value={[selectedSectionData.styles.fontSize]}
                        onValueChange={([value]) => updateSectionStyles(selectedSection!, { fontSize: value })}
                        min={12}
                        max={48}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Padding: {selectedSectionData.styles.padding}px</Label>
                      <Slider
                        value={[selectedSectionData.styles.padding]}
                        onValueChange={([value]) => updateSectionStyles(selectedSection!, { padding: value })}
                        min={0}
                        max={80}
                        step={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Background Blur: {selectedSectionData.styles.blur}px</Label>
                      <Slider
                        value={[selectedSectionData.styles.blur]}
                        onValueChange={([value]) => updateSectionStyles(selectedSection!, { blur: value })}
                        min={0}
                        max={20}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-sm mb-2">Quick Styles</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateSectionStyles(selectedSection!, {
                              backgroundColor: "#ffffff",
                              textColor: "#1f2937",
                              fontSize: 16,
                              padding: 32,
                            })
                          }
                        >
                          Clean
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateSectionStyles(selectedSection!, {
                              backgroundColor: "#059669",
                              textColor: "#ffffff",
                              fontSize: 18,
                              padding: 40,
                            })
                          }
                        >
                          Bold
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateSectionStyles(selectedSection!, {
                              backgroundColor: "#f8fafc",
                              textColor: "#475569",
                              fontSize: 14,
                              padding: 24,
                            })
                          }
                        >
                          Subtle
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateSectionStyles(selectedSection!, {
                              backgroundColor: "#1f2937",
                              textColor: "#f9fafb",
                              fontSize: 16,
                              padding: 36,
                            })
                          }
                        >
                          Dark
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    Select a section to edit its styles
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
    </div>
  )
}
