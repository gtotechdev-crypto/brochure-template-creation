"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Trash2, Eye, Grid, List, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageItem {
  id: string
  url: string
  name: string
  size: number
  type: string
  uploadDate: Date
  tags: string[]
}

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void
  selectedImage?: string | null
}

export function ImageGallery({ onImageSelect, selectedImage }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      url: "/corporate-office-building.png",
      name: "corporate-office.jpg",
      size: 245760,
      type: "image/jpeg",
      uploadDate: new Date(),
      tags: ["corporate", "office", "building"],
    },
    {
      id: "2",
      url: "/business-team-meeting.png",
      name: "team-meeting.jpg",
      size: 189440,
      type: "image/jpeg",
      uploadDate: new Date(),
      tags: ["team", "meeting", "business"],
    },
    {
      id: "3",
      url: "/modern-technology-abstract.png",
      name: "tech-abstract.jpg",
      size: 156672,
      type: "image/jpeg",
      uploadDate: new Date(),
      tags: ["technology", "abstract", "modern"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: ImageItem = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date(),
            tags: [],
          }
          setImages((prev) => [newImage, ...prev])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFileUpload(files)
  }

  const deleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const filteredImages = images.filter(
    (image) =>
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const stockImages = [
    { url: "/professional-handshake-business.jpg", name: "Business Handshake" },
    { url: "/modern-office.png", name: "Modern Workspace" },
    { url: "/corporate-team-collaboration.jpg", name: "Team Collaboration" },
    { url: "/financial-growth-chart.png", name: "Growth Chart" },
    { url: "/innovation-technology.png", name: "Innovation Tech" },
    { url: "/professional-presentation-meeting.jpg", name: "Presentation" },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Gallery
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="uploaded" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="uploaded">My Images</TabsTrigger>
            <TabsTrigger value="stock">Stock Images</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="uploaded" className="h-full">
              <div className="h-full flex flex-col">
                {/* Upload Area */}
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 mb-4 transition-colors cursor-pointer",
                    dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag & drop images here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, GIF up to 10MB</p>
                  </div>
                </div>

                {/* Search and Controls */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search images..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  >
                    {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Images Grid/List */}
                <ScrollArea className="flex-1">
                  {filteredImages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "No images found matching your search." : "No images uploaded yet."}
                    </div>
                  ) : (
                    <div className={cn(viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-2")}>
                      {filteredImages.map((image) => (
                        <div
                          key={image.id}
                          className={cn(
                            "group relative cursor-pointer rounded-lg overflow-hidden border transition-all",
                            selectedImage === image.url
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50",
                            viewMode === "list" && "flex items-center gap-3 p-2",
                          )}
                          onClick={() => onImageSelect(image.url)}
                        >
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className={cn("object-cover", viewMode === "grid" ? "w-full h-24" : "w-16 h-16 rounded")}
                          />

                          {viewMode === "grid" ? (
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="flex gap-1">
                                <Button size="sm" variant="secondary">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteImage(image.id)
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{image.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(image.size)} • {image.uploadDate.toLocaleDateString()}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {image.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {viewMode === "grid" && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2">
                              <p className="text-xs truncate">{image.name}</p>
                              <p className="text-xs opacity-75">{formatFileSize(image.size)}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="stock" className="h-full">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-3">
                  {stockImages.map((image, index) => (
                    <div
                      key={index}
                      className={cn(
                        "group relative cursor-pointer rounded-lg overflow-hidden border transition-all",
                        selectedImage === image.url
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => onImageSelect(image.url)}
                    >
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-3 w-3 mr-1" />
                          Select
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2">
                        <p className="text-xs truncate">{image.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </Card>
  )
}
