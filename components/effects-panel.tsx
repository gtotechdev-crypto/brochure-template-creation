"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Layers, Palette, Zap, RotateCcw } from "lucide-react"

interface EffectsPanelProps {
  sectionId: string | null
  effects: {
    blur: number
    opacity: number
    brightness: number
    contrast: number
    saturate: number
    hueRotate: number
    shadow: string
    borderRadius: number
    transform: {
      scale: number
      rotate: number
      skewX: number
      skewY: number
    }
    animation: {
      type: string
      duration: number
      delay: number
    }
  }
  onEffectsChange: (effects: any) => void
}

export function EffectsPanel({ sectionId, effects, onEffectsChange }: EffectsPanelProps) {
  const updateEffect = (key: string, value: any) => {
    onEffectsChange({ ...effects, [key]: value })
  }

  const updateTransform = (key: string, value: number) => {
    onEffectsChange({
      ...effects,
      transform: { ...effects.transform, [key]: value },
    })
  }

  const updateAnimation = (key: string, value: any) => {
    onEffectsChange({
      ...effects,
      animation: { ...effects.animation, [key]: value },
    })
  }

  const resetEffects = () => {
    onEffectsChange({
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
    })
  }

  if (!sectionId) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Select a section to apply effects</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Visual Effects
          </CardTitle>
          <Button size="sm" variant="outline" onClick={resetEffects}>
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="filters" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="filters">
              <Palette className="h-4 w-4 mr-1" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="transform">
              <Layers className="h-4 w-4 mr-1" />
              Transform
            </TabsTrigger>
            <TabsTrigger value="animation">
              <Zap className="h-4 w-4 mr-1" />
              Animation
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="filters" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs">Blur: {effects.blur}px</Label>
                    <Slider
                      value={[effects.blur]}
                      onValueChange={([value]) => updateEffect("blur", value)}
                      min={0}
                      max={20}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Opacity: {effects.opacity}%</Label>
                    <Slider
                      value={[effects.opacity]}
                      onValueChange={([value]) => updateEffect("opacity", value)}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Brightness: {effects.brightness}%</Label>
                    <Slider
                      value={[effects.brightness]}
                      onValueChange={([value]) => updateEffect("brightness", value)}
                      min={0}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Contrast: {effects.contrast}%</Label>
                    <Slider
                      value={[effects.contrast]}
                      onValueChange={([value]) => updateEffect("contrast", value)}
                      min={0}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Saturation: {effects.saturate}%</Label>
                    <Slider
                      value={[effects.saturate]}
                      onValueChange={([value]) => updateEffect("saturate", value)}
                      min={0}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Hue Rotate: {effects.hueRotate}°</Label>
                    <Slider
                      value={[effects.hueRotate]}
                      onValueChange={([value]) => updateEffect("hueRotate", value)}
                      min={0}
                      max={360}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-xs">Shadow</Label>
                    <Select value={effects.shadow} onValueChange={(value) => updateEffect("shadow", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2X Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs">Border Radius: {effects.borderRadius}px</Label>
                    <Slider
                      value={[effects.borderRadius]}
                      onValueChange={([value]) => updateEffect("borderRadius", value)}
                      min={0}
                      max={50}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="transform" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs">Scale: {effects.transform.scale}%</Label>
                    <Slider
                      value={[effects.transform.scale]}
                      onValueChange={([value]) => updateTransform("scale", value)}
                      min={50}
                      max={150}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Rotate: {effects.transform.rotate}°</Label>
                    <Slider
                      value={[effects.transform.rotate]}
                      onValueChange={([value]) => updateTransform("rotate", value)}
                      min={-180}
                      max={180}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Skew X: {effects.transform.skewX}°</Label>
                    <Slider
                      value={[effects.transform.skewX]}
                      onValueChange={([value]) => updateTransform("skewX", value)}
                      min={-45}
                      max={45}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Skew Y: {effects.transform.skewY}°</Label>
                    <Slider
                      value={[effects.transform.skewY]}
                      onValueChange={([value]) => updateTransform("skewY", value)}
                      min={-45}
                      max={45}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm mb-2">Quick Transforms</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onEffectsChange({
                            ...effects,
                            transform: { scale: 105, rotate: 2, skewX: 0, skewY: 0 },
                          })
                        }
                      >
                        Subtle Tilt
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onEffectsChange({
                            ...effects,
                            transform: { scale: 110, rotate: 0, skewX: 0, skewY: 0 },
                          })
                        }
                      >
                        Scale Up
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onEffectsChange({
                            ...effects,
                            transform: { scale: 100, rotate: 0, skewX: 5, skewY: 0 },
                          })
                        }
                      >
                        Perspective
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onEffectsChange({
                            ...effects,
                            transform: { scale: 100, rotate: 0, skewX: 0, skewY: 0 },
                          })
                        }
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="animation" className="h-full">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs">Animation Type</Label>
                    <Select value={effects.animation.type} onValueChange={(value) => updateAnimation("type", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="fadeIn">Fade In</SelectItem>
                        <SelectItem value="slideUp">Slide Up</SelectItem>
                        <SelectItem value="slideDown">Slide Down</SelectItem>
                        <SelectItem value="slideLeft">Slide Left</SelectItem>
                        <SelectItem value="slideRight">Slide Right</SelectItem>
                        <SelectItem value="zoomIn">Zoom In</SelectItem>
                        <SelectItem value="zoomOut">Zoom Out</SelectItem>
                        <SelectItem value="bounce">Bounce</SelectItem>
                        <SelectItem value="pulse">Pulse</SelectItem>
                        <SelectItem value="shake">Shake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs">Duration: {effects.animation.duration}s</Label>
                    <Slider
                      value={[effects.animation.duration]}
                      onValueChange={([value]) => updateAnimation("duration", value)}
                      min={0.1}
                      max={5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Delay: {effects.animation.delay}s</Label>
                    <Slider
                      value={[effects.animation.delay]}
                      onValueChange={([value]) => updateAnimation("delay", value)}
                      min={0}
                      max={3}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm mb-2">Animation Presets</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" onClick={() => updateAnimation("type", "fadeIn")}>
                        Fade In Entrance
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateAnimation("type", "slideUp")}>
                        Slide Up Entrance
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateAnimation("type", "zoomIn")}>
                        Zoom In Entrance
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateAnimation("type", "bounce")}>
                        Bounce Effect
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
