package main

import (
	"embed"
	"fmt"
	"log"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := NewApp()

	appOptions := &options.App{
		Title:  "Syslog2Bot v1.3.2 — By 迷人安全",
		Width:  1280,
		Height: 800,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		CSSDragProperty: "--wails-draggable",
		CSSDragValue:    "drag",
	}

	applyPlatformOptions(appOptions)

	err := wails.Run(appOptions)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		log.Println("Error:", err)
		os.Exit(1)
	}
}
