package renderer

import (
	"image"
	"image/color"
)

func GetRectangle(clr color.Color, width, height int) *image.RGBA {
	img := image.NewRGBA(image.Rect(0, 0, width, height))

	for y := range height {
		for x := range width {
			img.Set(x, y, clr)
		}
	}

	return img
}
