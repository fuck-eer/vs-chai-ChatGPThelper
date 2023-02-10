import * as _vscode from "vscode";

const allThemes = ["yellow", "pink", "purple", "green"] as const;
type ThemeType = typeof allThemes[number];

const themeKey = "gptThemeKey";

export class ThemeManager {
	static globalState: _vscode.Memento;

	static getTheme(): ThemeType {
		return this.globalState.get(themeKey) ?? "purple";
	}

	static setTheme(theme: ThemeType) {
		return this.globalState.update(themeKey, theme);
	}
}
