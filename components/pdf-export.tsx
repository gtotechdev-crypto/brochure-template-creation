"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Settings, Printer, Share2, CheckCircle } from "lucide-react"

interface PDFExportProps {
  brochureData: any
  onExport: (options: ExportOptions) => Promise<void>
}

interface ExportOptions {
  format: "pdf" | "png" | "jpg"
  quality: number
  pageSize: "letter" | "a4" | "legal" | "tabloid"
  orientation: "portrait" | "landscape"
  margins: number
  includeBleed: boolean
  resolution: number
  colorProfile: "rgb" | "cmyk"
}

export function PDFExport({ brochureData, onExport }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "pdf",
    quality: 95,
    pageSize: "letter",
    orientation: "portrait",
    margins: 0.5,
    includeBleed: false,
    resolution: 300,
    colorProfile: "rgb",
  })

  const updateOption = (key: keyof ExportOptions, value: any) => {
    setExportOptions((prev) => ({ ...prev, [key]: value }))
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    try {
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      await onExport(exportOptions)

      clearInterval(progressInterval)
      setExportProgress(100)
      setExportComplete(true)

      setTimeout(() => {
        setIsExporting(false)
        setExportComplete(false)
        setExportProgress(0)
      }, 2000)
    } catch (error) {
      console.error("Export failed:", error)
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const getFileSizeEstimate = () => {
    const baseSize = brochureData.sections.length * 0.5 // MB per section
    const qualityMultiplier = exportOptions.quality / 100
    const resolutionMultiplier = exportOptions.resolution / 150
    return Math.round(baseSize * qualityMultiplier * resolutionMultiplier * 10) / 10
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-2">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Brochure
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Progress */}
          {isExporting && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{exportComplete ? "Export Complete!" : "Exporting..."}</span>
                    {exportComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <Progress value={exportProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    {exportComplete
                      ? "Your brochure has been exported successfully."
                      : "Processing your brochure for export..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Format Options */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Export Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Format</Label>
                  <Select
                    value={exportOptions.format}
                    onValueChange={(value: "pdf" | "png" | "jpg") => updateOption("format", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="png">PNG Image</SelectItem>
                      <SelectItem value="jpg">JPG Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Page Size</Label>
                  <Select
                    value={exportOptions.pageSize}
                    onValueChange={(value: any) => updateOption("pageSize", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">Letter (8.5" × 11")</SelectItem>
                      <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                      <SelectItem value="legal">Legal (8.5" × 14")</SelectItem>
                      <SelectItem value="tabloid">Tabloid (11" × 17")</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Orientation</Label>
                  <Select
                    value={exportOptions.orientation}
                    onValueChange={(value: any) => updateOption("orientation", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Color Profile</Label>
                  <Select
                    value={exportOptions.colorProfile}
                    onValueChange={(value: any) => updateOption("colorProfile", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rgb">RGB (Screen)</SelectItem>
                      <SelectItem value="cmyk">CMYK (Print)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Settings */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quality Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm">Quality: {exportOptions.quality}%</Label>
                <Slider
                  value={[exportOptions.quality]}
                  onValueChange={([value]) => updateOption("quality", value)}
                  min={50}
                  max={100}
                  step={5}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>

              <div>
                <Label className="text-sm">Resolution: {exportOptions.resolution} DPI</Label>
                <Slider
                  value={[exportOptions.resolution]}
                  onValueChange={([value]) => updateOption("resolution", value)}
                  min={72}
                  max={600}
                  step={72}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>72 DPI (Web)</span>
                  <span>300 DPI (Print)</span>
                  <span>600 DPI (High-res)</span>
                </div>
              </div>

              <div>
                <Label className="text-sm">Margins: {exportOptions.margins}"</Label>
                <Slider
                  value={[exportOptions.margins]}
                  onValueChange={([value]) => updateOption("margins", value)}
                  min={0}
                  max={2}
                  step={0.25}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Include Bleed Area</Label>
                  <p className="text-xs text-muted-foreground">Add 0.125" bleed for professional printing</p>
                </div>
                <Switch
                  checked={exportOptions.includeBleed}
                  onCheckedChange={(checked) => updateOption("includeBleed", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Export Summary */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Export Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sections to export:</span>
                <span>{brochureData.sections.filter((s: any) => s.visible).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated file size:</span>
                <span>{getFileSizeEstimate()} MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Format:</span>
                <span>{exportOptions.format.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Resolution:</span>
                <span>{exportOptions.resolution} DPI</span>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Export Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print Preview
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>

            <Button onClick={handleExport} disabled={isExporting} className="min-w-[120px]">
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export {exportOptions.format.toUpperCase()}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
