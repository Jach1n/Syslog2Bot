//go:build darwin

package main

import (
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

func applyPlatformOptions(appOptions *options.App) {
	appOptions.Mac = &mac.Options{
		TitleBar: &mac.TitleBar{
			TitlebarAppearsTransparent: true,
			HideTitleBar:              false,
			FullSizeContent:           true,
			HideTitle:                 true,
		},
		WindowIsTranslucent: false,
	}
}
