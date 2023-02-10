import { TokenManager } from "./TokenManager";
import * as path from "path";
import * as vscode from "vscode";
import { ThemeManager } from "./ThemeManager";

let chaiStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	TokenManager.globalState = context.globalState;
	ThemeManager.globalState = context.globalState;
	chaiStatusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		100
	);
	chaiStatusBarItem.command = TokenManager.getToken()
		? "chatgpt-helper.start"
		: "chatgpt-helper.auth";
	chaiStatusBarItem.tooltip = "CH.AI";
	chaiStatusBarItem.name = "chai:ChatGPT-Helper";
	chaiStatusBarItem.text = "$(comment-discussion) CH.AI";

	context.subscriptions.push(chaiStatusBarItem);
	context.subscriptions.push(
		vscode.commands.registerCommand("chatgpt-helper.start", () => {
			ReactPanel.createOrShow(context.extensionPath);
			chaiStatusBarItem.hide();
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("chatgpt-helper.removeAuthKey", () => {
			try {
				TokenManager.removeToken().then(() => {
					vscode.commands
						.executeCommand("workbench.action.webview.reloadWebviewAction")
						.then(() => {
							vscode.window.showInformationMessage(
								"GPT auth Token removed successfully!"
							);
							ReactPanel.currentPanel?.dispose();
						});
				});
			} catch (err) {
				vscode.window.showErrorMessage(
					"Unable to execute the request at this moment! Please try again later"
				);
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("chatgpt-helper.auth", () => {
			vscode.window
				.showInputBox({
					prompt: "https://beta.openai.com/account/api-keys",
					placeHolder: "Paste your gpt-Key here",
				})
				.then((enteredValue) => {
					if (enteredValue) {
						try {
							TokenManager.setToken(enteredValue).then(() => {
								vscode.commands.executeCommand("chatgpt-helper.start");
							});
						} catch (err) {
							vscode.window.showErrorMessage("unable to set GPT API Key");
						}
					} else {
						vscode.window.showErrorMessage("Enter an Api key to continue...");
					}
				});
		})
	);
	chaiStatusBarItem.show();
}

/**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = "react";

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];
	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(
				extensionPath,
				column || vscode.ViewColumn.One
			);
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(
			ReactPanel.viewType,
			"CH.AI",
			column,
			{
				// Enable javascript in the webview
				enableScripts: true,

				// And restric the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [
					vscode.Uri.file(path.join(this._extensionPath, "build")),
				],
			}
		);

		// Set the webview's initial html content
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(
			() => {
				this.dispose();
				chaiStatusBarItem.show();
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.type) {
					case "alert":
						vscode.window.showErrorMessage(message.text);
						return;
					case "getToken": {
						const token = TokenManager.getToken() ?? "";
						if (!token) {
							vscode.window.showErrorMessage("No Token Found");
							return;
						}
						this._panel.webview.postMessage({ type: "token", value: token });
						return;
					}
					case "removeToken": {
						vscode.commands.executeCommand("chatgpt-helper.removeAuthKey");
						return;
					}
					case "getTheme": {
						const theme = ThemeManager.getTheme();
						this._panel.webview.postMessage({ type: "theme", value: theme });
						return;
					}
					case "setTheme": {
						ThemeManager.setTheme(message.value);
						return;
					}
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ type: "refactor" });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {
		const manifest = require(path.join(
			this._extensionPath,
			"build",
			"asset-manifest.json"
		));
		const mainScript = manifest["files"]["main.js"];
		const mainStyle = manifest["files"]["main.css"];
		const basePath = this._panel.webview.asWebviewUri(
			vscode.Uri.file(path.join(this._extensionPath, "build"))
		);
		const logoURI = this._panel.webview.asWebviewUri(
			vscode.Uri.file(path.join(this._extensionPath, "build", "favicon.ico"))
		);
		const scriptPathOnDisk = vscode.Uri.file(
			path.join(this._extensionPath, "build", mainScript)
		);
		const scriptUri = this._panel.webview.asWebviewUri(scriptPathOnDisk);
		const stylePathOnDisk = vscode.Uri.file(
			path.join(this._extensionPath, "build", mainStyle)
		);
		const styleUri = this._panel.webview.asWebviewUri(stylePathOnDisk);
		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>CH.AI</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<link
			href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Josefin+Sans:wght@100;200;300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
			rel="stylesheet"
		/>
				<base href="${basePath}">
				<script nonce="${nonce}">
          window.tsvscode = acquireVsCodeApi();
        </script>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
function getNonce() {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
