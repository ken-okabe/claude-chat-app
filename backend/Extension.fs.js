import { equals, createAtom } from "../fable_modules/fable-library-js.4.19.3/Util.js";
import { NullableT$1__get_Value, NullableT, NullableT$1 } from "../a-libs/timeline/x-nullable.fs.js";
import * as vscode from "vscode";

export let currentPanel = createAtom(new NullableT$1(0, []));

export function createWebview(context) {
    const panel = vscode.window.createWebviewPanel("fsharpWebview", "F# WebView", 1, {
        enableScripts: true,
    });
    panel.webview.html = "\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>F# WebView</title>\n        </head>\n        <body>\n            <h1>Hello from F# WebView!</h1>\n        </body>\n        </html>\n    ";
    panel.webview.onDidReceiveMessage((message) => {
        if (message.command === "hello") {
            vscode.window.showInformationMessage("Hello from WebView!");
        }
    });
    currentPanel(NullableT(panel));
}

export function activate(context) {
    const helloWorldCommand = vscode.commands.registerCommand("claude-chat-app.helloWorld", (_arg) => {
        vscode.window.showInformationMessage("Hello World from F#!");
    });
    const showWebviewCommand = vscode.commands.registerCommand("claude-chat-app.showWebview", (_arg_1) => {
        createWebview(context);
    });
    void (context.subscriptions.push(helloWorldCommand));
    void (context.subscriptions.push(showWebviewCommand));
}

export function deactivate() {
    if (equals(currentPanel(), new NullableT$1(0, []))) {
    }
    else {
        NullableT$1__get_Value(currentPanel()).dispose();
    }
}

export const exports = {
    activate: (context) => {
        activate(context);
    },
    deactivate: () => {
        deactivate();
    },
};

export default exports;

