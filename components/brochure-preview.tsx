"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface BrochureData {
  title: string
  subtitle: string
  logo?: string
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

interface BrochurePreviewProps {
  data: BrochureData
  fullscreen?: boolean
  singlePage?: boolean // Added singlePage prop for page-wise viewing
}

export function BrochurePreview({ data, fullscreen = false, singlePage = false }: BrochurePreviewProps) {
  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  const projectImages = [
    { src: "/project-revolving-door.jpg", title: "Modern Revolving Door Systems" },
    { src: "/project-elevator-doors.jpg", title: "Premium Elevator Installations" },
    { src: "/project-willow-square.jpg", title: "Willow Square Reception Design" },
    { src: "/project-luxury-elevators.jpg", title: "Luxury Elevator Lobbies" },
    { src: "/project-flamek-kiosk.jpg", title: "Flamek Display Kiosk" },
    { src: "/project-cafe-interior.jpg", title: "Contemporary Café Interiors" },
    { src: "/project-bharat-petroleum.jpg", title: "Bharat Petroleum Office" },
    { src: "/project-elevator-bank.jpg", title: "Corporate Elevator Banks" },
    { src: "/project-enchanted-signage.jpg", title: "Enchanted Building Signage" },
  ]

  const renderSection = (section: any, index: number) => {
    if (!section.visible) return null

    const isEven = index % 2 === 0
    const sectionStyle = {
      backgroundColor: section.styles.backgroundColor,
      color: section.styles.textColor,
      fontSize: `${section.styles.fontSize}px`,
      padding: `${section.styles.padding}px`,
    }

    const backgroundStyle = section.backgroundImage
      ? {
          backgroundImage: `url(${section.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}

    const blurOverlay =
      section.styles.blur > 0
        ? {
            backdropFilter: `blur(${section.styles.blur}px)`,
            backgroundColor: `${section.styles.backgroundColor}CC`, // Add transparency
          }
        : {}

    if (section.type === "projects") {
      return (
        <div key={section.id} className="brochure-section relative overflow-hidden" style={backgroundStyle}>
          <div style={{ ...sectionStyle, ...blurOverlay }}>
            <h2 className="text-2xl font-heading font-bold mb-4 text-center">{section.title}</h2>
            <div className="leading-relaxed text-pretty mb-6 text-center max-w-3xl mx-auto">
              {formatContent(section.content)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {projectImages.map((project, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <img
                    src={project.src || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-24 object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="text-white text-[10px] font-medium leading-tight line-clamp-2">{project.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-2 group-hover:ring-blue-400/30 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    const sectionHeight = singlePage ? "min-h-[calc(100vh-200px)]" : "h-96"

    switch (section.layout) {
      case "diagonal":
        return (
          <div key={section.id} className={`brochure-section relative ${sectionHeight} flex overflow-hidden`}>
            <div
              className={`w-1/2 ${isEven ? "split-diagonal" : "split-diagonal-reverse"} flex items-center justify-center relative`}
              style={backgroundStyle}
            >
              <div
                className="absolute inset-0 flex items-center justify-center p-8"
                style={{ ...sectionStyle, ...blurOverlay }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-bold mb-4">{section.title}</h2>
                  <div className="leading-relaxed text-balance">{formatContent(section.content)}</div>
                </div>
              </div>
            </div>
            <div className={`w-1/2 ${isEven ? "bg-muted/10" : "bg-secondary/10"} flex items-center justify-center p-8`}>
              <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Content Area</span>
              </div>
            </div>
          </div>
        )

      case "split":
        return (
          <div key={section.id} className={`brochure-section ${sectionHeight} flex`}>
            <div className="w-1/2 flex items-center relative overflow-hidden" style={backgroundStyle}>
              <div className="absolute inset-0 flex items-center p-8" style={{ ...sectionStyle, ...blurOverlay }}>
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-4">{section.title}</h2>
                  <div className="leading-relaxed text-pretty">{formatContent(section.content)}</div>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-muted/30 flex items-center justify-center">
              {section.backgroundImage ? (
                <img
                  src={section.backgroundImage || "/placeholder.svg"}
                  alt="Section background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground">Image Placeholder</span>
              )}
            </div>
          </div>
        )

      case "centered":
        return (
          <div
            key={section.id}
            className={`brochure-section relative ${sectionHeight} flex items-center justify-center overflow-hidden`}
            style={backgroundStyle}
          >
            <div
              className="text-center max-w-2xl mx-auto relative z-10"
              style={{ ...sectionStyle, ...blurOverlay, borderRadius: "12px" }}
            >
              <h2 className="text-3xl font-heading font-bold mb-4">{section.title}</h2>
              <div className="text-lg leading-relaxed text-balance">{formatContent(section.content)}</div>
            </div>
          </div>
        )

      default:
        return (
          <div key={section.id} className="brochure-section relative overflow-hidden">
            {section.type === "hero" ? (
              <div
                className={`${sectionHeight} flex items-center justify-center text-center relative`}
                style={backgroundStyle}
              >
                <div
                  className="relative z-10 max-w-3xl mx-auto"
                  style={{ ...sectionStyle, ...blurOverlay, borderRadius: "12px" }}
                >
                  {data.logo && (
                    <div className="mb-6">
                      <img
                        src={data.logo || "/placeholder.svg"}
                        alt="Company Logo"
                        className="h-20 w-auto mx-auto mb-4 drop-shadow-lg"
                      />
                    </div>
                  )}
                  <h1 className="text-4xl font-heading font-bold mb-2">{data.title}</h1>
                  <p className="text-xl mb-6 opacity-90">{data.subtitle}</p>
                  <div className="text-lg text-balance">{formatContent(section.content)}</div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden" style={backgroundStyle}>
                <div style={{ ...sectionStyle, ...blurOverlay }}>
                  <h2 className="text-2xl font-heading font-bold mb-4">{section.title}</h2>
                  <div className="leading-relaxed text-pretty">{formatContent(section.content)}</div>

                  {section.type === "contact" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-3">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <h3 className="font-semibold mb-2 text-lg">📞 Phone Numbers</h3>
                          <p className="text-sm opacity-90">90250 95059</p>
                          <p className="text-sm opacity-90">82484 34140</p>
                          <p className="text-sm opacity-90">72990 03531</p>
                        </div>
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <h3 className="font-semibold mb-2 text-lg">✉️ Email</h3>
                          <p className="text-sm opacity-90">sales@anchoragebc.com</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <h3 className="font-semibold mb-2 text-lg">🌐 Website</h3>
                          <p className="text-sm opacity-90">www.AnchorageBC.com</p>
                        </div>
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                          <h3 className="font-semibold mb-2 text-lg">📍 Address</h3>
                          <p className="text-sm opacity-90">#62A, Thiruvalluvar Street</p>
                          <p className="text-sm opacity-90">Jagathambigai Nagar, Padi</p>
                          <p className="text-sm opacity-90">Chennai - 600 050</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  const visibleSections = data.sections.filter((section) => section.visible)

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div
          className={cn(
            "brochure-page mx-auto bg-white shadow-lg",
            fullscreen ? "max-w-4xl" : "max-w-2xl",
            singlePage && "min-h-full", // Added min-height for single page view
          )}
        >
          {visibleSections.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg mb-2">No visible sections</p>
                <p className="text-sm">Add sections or make existing sections visible to see your brochure</p>
              </div>
            </div>
          ) : (
            visibleSections.map((section, index) => renderSection(section, index))
          )}

          {!singlePage && (
            <div className="p-8 bg-gradient-to-r from-blue-900 to-blue-700 text-center border-t">
              <div className="text-white">
                {data.logo && (
                  <img
                    src={data.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-12 w-auto mx-auto mb-3 opacity-90"
                  />
                )}
                <h3 className="font-heading font-bold text-lg mb-2">Anchorage Business Corp Pvt. Ltd.</h3>
                <p className="text-sm opacity-90 mb-1">Empowering Your Business</p>
                <div className="flex items-center justify-center space-x-4 text-xs opacity-75 mt-3">
                  <span>📞 90250 95059</span>
                  <span>✉️ sales@anchoragebc.com</span>
                  <span>🌐 www.AnchorageBC.com</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
