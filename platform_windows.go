//go:build windows

package main

import (
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

func applyPlatformOptions(appOptions *options.App) {
	appOptions.Windows = &windows.Options{
		WebviewIsTransparent:              false,
		WindowIsTranslucent:               false,
		DisableWindowIcon:                 false,
		DisableFramelessWindowDecorations: false,
		WebviewUserDataPath:               "",
		WebviewBrowserPath:                "",
		Theme:                             windows.SystemDefault,
	}
	appOptions.Frameless = true
}
