"use client"

import { useState } from "react"
import { BrochureEditor } from "@/components/brochure-editor"
import { BrochurePreview } from "@/components/brochure-preview"
import { ImageGallery } from "@/components/image-gallery"
import { PDFExport } from "@/components/pdf-export"
import { LayoutTemplates } from "@/components/layout-templates"
import { EffectsPanel } from "@/components/effects-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Eye,
  Edit,
  ImageIcon,
  Palette,
  Layout,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileDown,
} from "lucide-react"
import { PDFGenerator } from "@/lib/pdf-generator"
import type { ExportOptions } from "@/lib/pdf-generator"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"editor" | "preview" | "pages">("editor")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [sectionEffects, setSectionEffects] = useState<Record<string, any>>({})
  const [currentPage, setCurrentPage] = useState(0)

  const [brochureData, setBrochureData] = useState({
    title: "Anchorage Business Corp Pvt. Ltd.",
    subtitle: "Empowering Your Business",
    logo: "/abc-logo.jpg",
    sections: [
      {
        id: "1",
        type: "hero",
        title: "Anchorage Business Corp Pvt. Ltd.",
        content:
          "Your One-Stop Solution for All Your Needs\n\nYour partner in unlocking business potential through expert solutions and unparalleled services.\n\nwww.AnchorageBC.com | 90250 95059",
        backgroundImage: "/corporate-office-building.png",
        layout: "full",
        visible: true,
        styles: {
          backgroundColor: "#1e40af",
          textColor: "#ffffff",
          fontSize: 18,
          padding: 48,
          blur: 0,
        },
      },
      {
        id: "2",
        type: "content",
        title: "About Us & Why Choose Us",
        content:
          "About Us\nAnchorage Business Corp Private Limited (ABC) is a diversified service provider dedicated to delivering excellence across a spectrum of industries. We combine deep expertise, innovative thinking, and a client-first philosophy to become a trusted, holistic partner for businesses aiming to scale and succeed.\n\nWhy Partner with ABC?\n• Expertise: Industry experts with extensive knowledge and experience\n• Customized Solutions: Tailoring services to meet each client's specific needs\n• Innovation & Technology: Leveraging the latest technologies and innovative approaches\n• Sustainability Focus: Committed to sustainable and responsible practices\n• Customer-Centric Approach: Your success is our ultimate priority",
        backgroundImage: "/business-team-meeting.png",
        layout: "split",
        visible: true,
        styles: {
          backgroundColor: "#f8fafc",
          textColor: "#1f2937",
          fontSize: 16,
          padding: 40,
          blur: 2,
        },
      },
      {
        id: "3",
        type: "content",
        title: "Our Comprehensive Services",
        content:
          "ABC offers a wide range of services to meet the diverse needs of modern businesses. Our expertise spans across multiple sectors, ensuring a holistic approach to your business challenges.\n\nIT Solutions:\n• IT Infrastructure & Surveillance Solutions\n• Web development and Mobile app Development\n\nConstruction & Fabrication:\n• Construction, Civil Engineer & Contractor\n• Fabrication Services & Interior Services\n\nBusiness Support & Logistics:\n• HR Solutions\n• Accounts and Auditing Services\n• Import & Export Solutions\n\nProduct Supply:\n• Housekeeping Products\n• Ferrous and Non-Ferrous Material Supply\n• Safety Equipment Supply\n\nTake Your Business to the Next Level with ABC!",
        backgroundImage: "/modern-technology-abstract.png",
        layout: "diagonal",
        visible: true,
        styles: {
          backgroundColor: "#0f172a",
          textColor: "#f1f5f9",
          fontSize: 15,
          padding: 36,
          blur: 1,
        },
      },
      {
        id: "4",
        type: "projects",
        title: "Our Projects - Excellence in Action",
        content:
          "Discover our portfolio of successful projects that demonstrate our expertise across construction, interior design, and commercial installations.\n\n• Modern Revolving Door Systems - Advanced entrance solutions with curved glass design\n• Luxury Elevator Installations - Premium elevator systems with marble and wood finishes\n• Corporate Interior Design - Willow Square reception and co-working spaces\n• Commercial Branding Solutions - Flamek kiosk and display installations\n• Restaurant & Café Interiors - Contemporary dining spaces with custom design\n• Office Space Development - Bharat Petroleum corporate offices\n• Building Signage Projects - Enchanted Skyscraper exterior branding\n\nEach project reflects our commitment to quality, innovation, and client satisfaction.",
        backgroundImage: "/project-willow-square.jpg",
        layout: "split",
        visible: true,
        styles: {
          backgroundColor: "#0c4a6e",
          textColor: "#e0f2fe",
          fontSize: 16,
          padding: 40,
          blur: 1,
        },
      },
      {
        id: "5",
        type: "content",
        title: "Our Vision, Mission & Leadership",
        content:
          'Our Vision & Mission\n\nVision:\n"To be the premier consortium that empowers businesses globally by providing integrated, innovative, and sustainable solutions that drive growth and create lasting value."\n\nMission:\n"Our mission is to empower businesses with high-quality, expert services across IT, construction, logistics, and supply chains, building trusted partnerships that foster success and resilience."\n\nMeet Our Leadership Team\n• U. Hari Krishnan – Founder & Managing Director\n• T. G. Sathyanarayann – Finance Director\n• Sukumaran – Marketing Director\n• JM Nagarajan – C.E.O\n• N. Sudhakar – Executive Director',
        backgroundImage: "/professional-handshake-business.jpg",
        layout: "centered",
        visible: true,
        styles: {
          backgroundColor: "#065f46",
          textColor: "#ecfdf5",
          fontSize: 16,
          padding: 42,
          blur: 1,
        },
      },
      {
        id: "6",
        type: "contact",
        title: "Get in Touch with Us",
        content:
          "Phone:\n90250 95059 / 82484 34140 / 72990 03531\n\nEmail:\nsales@anchoragebc.com\n\nWebsite:\nwww.AnchorageBC.com\n\nAddress:\n#62A, Thiruvalluvar Street, Jagathambigai Nagar, Padi, Chennai - 600 050.\n\nLet's build a stronger future for your business together. Contact us for a consultation today.",
        backgroundImage: "/corporate-team-collaboration.jpg",
        layout: "split",
        visible: true,
        styles: {
          backgroundColor: "#7c2d12",
          textColor: "#fef7ed",
          fontSize: 16,
          padding: 40,
          blur: 2,
        },
      },
    ],
  })

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    if (selectedSection) {
      const updatedSections = brochureData.sections.map((section) =>
        section.id === selectedSection ? { ...section, backgroundImage: imageUrl } : section,
      )
      setBrochureData({ ...brochureData, sections: updatedSections })
    }
  }

  const handleTemplateSelect = (template: any) => {
    // Apply template to brochure
    const newSections = template.sections.map((templateSection: any, index: number) => ({
      id: (index + 1).toString(),
      type: templateSection.type,
      title: templateSection.type === "hero" ? brochureData.title : `Section ${index + 1}`,
      content: templateSection.type === "hero" ? "Welcome to our company" : "Add your content here...",
      backgroundImage: null,
      layout: templateSection.layout,
      visible: true,
      styles: templateSection.styles,
    }))

    setBrochureData({ ...brochureData, sections: newSections })
  }

  const handleEffectsChange = (sectionId: string, effects: any) => {
    setSectionEffects((prev) => ({
      ...prev,
      [sectionId]: effects,
    }))
  }

  const handleExport = async (options: ExportOptions) => {
    try {
      await PDFGenerator.exportBrochure(brochureData, options)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

  const getCurrentSectionEffects = () => {
    if (!selectedSection) return null
    return (
      sectionEffects[selectedSection] || {
        blur: 0,
        opacity: 100,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotate: 0,
        shadow: "none",
        borderRadius: 0,
        transform: {
          scale: 100,
          rotate: 0,
          skewX: 0,
          skewY: 0,
        },
        animation: {
          type: "none",
          duration: 1,
          delay: 0,
        },
      }
    )
  }

  const visibleSections = brochureData.sections.filter((section) => section.visible)
  const totalPages = visibleSections.length

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-heading font-bold">Corporate Brochure Builder</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={currentView === "editor" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView("editor")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editor
              </Button>
              <Button
                variant={currentView === "preview" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView("preview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Full Preview
              </Button>
              <Button
                variant={currentView === "pages" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentView("pages")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Page View
              </Button>
              <PDFExport brochureData={brochureData} onExport={handleExport} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {currentView === "editor" ? (
            <>
              {/* Editor Panel */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="editor" className="h-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="editor">
                      <Palette className="h-4 w-4 mr-1" />
                      Editor
                    </TabsTrigger>
                    <TabsTrigger value="assets">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Assets
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="editor" className="h-full mt-2">
                    <BrochureEditor data={brochureData} onChange={setBrochureData} />
                  </TabsContent>

                  <TabsContent value="assets" className="h-full mt-2">
                    <Tabs defaultValue="images" className="h-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="images">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          Images
                        </TabsTrigger>
                        <TabsTrigger value="templates">
                          <Layout className="h-3 w-3 mr-1" />
                          Templates
                        </TabsTrigger>
                        <TabsTrigger value="effects">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Effects
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="images" className="h-full mt-2">
                        <ImageGallery onImageSelect={handleImageSelect} selectedImage={selectedImage} />
                      </TabsContent>

                      <TabsContent value="templates" className="h-full mt-2">
                        <LayoutTemplates onTemplateSelect={handleTemplateSelect} />
                      </TabsContent>

                      <TabsContent value="effects" className="h-full mt-2">
                        <EffectsPanel
                          sectionId={selectedSection}
                          effects={getCurrentSectionEffects()}
                          onEffectsChange={(effects) =>
                            selectedSection && handleEffectsChange(selectedSection, effects)
                          }
                        />
                      </TabsContent>
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-9">
                <Card className="h-full overflow-hidden">
                  <BrochurePreview data={brochureData} />
                </Card>
              </div>
            </>
          ) : currentView === "pages" ? (
            /* Added page-wise view */
            <>
              {/* Page Navigation Panel */}
              <div className="lg:col-span-3">
                <Card className="h-full p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Page Navigation</h3>
                      <span className="text-sm text-muted-foreground">
                        {currentPage + 1} of {totalPages}
                      </span>
                    </div>

                    {/* Page Thumbnails */}
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {visibleSections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => goToPage(index)}
                          className={`w-full p-3 text-left rounded-lg border transition-colors ${
                            currentPage === index ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                          }`}
                        >
                          <div className="font-medium text-sm truncate">
                            Page {index + 1}: {section.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {section.type === "hero"
                              ? "Cover Page"
                              : section.type === "projects"
                                ? "Project Gallery"
                                : section.type === "contact"
                                  ? "Contact Info"
                                  : "Content"}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Export Options */}
                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-medium text-sm">Export Options</h4>
                      <Button
                        onClick={() => handleExport({ format: "pdf", quality: "high" })}
                        className="w-full"
                        size="sm"
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Export All Pages as PDF
                      </Button>
                      <Button
                        onClick={() =>
                          handleExport({
                            format: "pdf",
                            quality: "high",
                            pages: [currentPage + 1],
                          })
                        }
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        Export Current Page Only
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Single Page Preview */}
              <div className="lg:col-span-9">
                <Card className="h-full overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Page Controls */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <Button variant="outline" size="sm" onClick={prevPage} disabled={totalPages <= 1}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Page {currentPage + 1} of {totalPages}
                        </span>
                        <span className="text-xs text-muted-foreground">{visibleSections[currentPage]?.title}</span>
                      </div>

                      <Button variant="outline" size="sm" onClick={nextPage} disabled={totalPages <= 1}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    {/* Single Page Content */}
                    <div className="flex-1 overflow-auto">
                      <BrochurePreview
                        data={{
                          ...brochureData,
                          sections: [visibleSections[currentPage]],
                        }}
                        singlePage
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            /* Full Preview */
            <div className="lg:col-span-12">
              <Card className="h-full overflow-hidden">
                <BrochurePreview data={brochureData} fullscreen />
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
