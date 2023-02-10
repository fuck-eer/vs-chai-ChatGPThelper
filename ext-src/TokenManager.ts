import * as vscode from "vscode";
const tokenKey = "gptApiKey";
export class TokenManager {
	static globalState: vscode.Memento;

	static getToken(): string | undefined {
		return this.globalState.get(tokenKey);
	}

	//this is async
	static setToken(token: string) {
		return this.globalState.update(tokenKey, token);
	}
	static removeToken() {
		return this.globalState.update(tokenKey, "");
	}
}
