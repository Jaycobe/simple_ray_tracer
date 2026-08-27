package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"go-raytracer/internal/renderer"
	"image/color"
	"image/png"
)

const (
	renderTypeRayTrace    = "raytrace"
	renderTypeLightWeight = "lightweight"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) RenderScene(renderType string, width, height int) (string, error) {
	if width <= 0 || height <= 0 {
		return "", fmt.Errorf("width or height must be positive")
	}

	var clr color.Color
	switch renderType {
	case renderTypeRayTrace:
		clr = color.Black
	case renderTypeLightWeight:
		clr = color.White
	default:
		return "", fmt.Errorf("unknown render type: %s", renderType)
	}

	img := renderer.GetRectangle(clr, width, height)
	if img == nil {
		return "", fmt.Errorf("render image is nil")
	}

	buf := new(bytes.Buffer)
	err := png.Encode(buf, img)
	if err != nil {
		return "", err
	}

	base64Str := base64.StdEncoding.EncodeToString(buf.Bytes())

	return base64Str, nil
}
