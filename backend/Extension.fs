module Extension

open Fable.Core
open Fable.Core.JsInterop
open Fable.VSCode

open Timeline.Nullable
open Timeline.Timeline

let mutable currentPanel: NullableT<WebviewPanel> = Null

let createWebview (context: ExtensionContext) =
    let panel = vscode.window.createWebviewPanel(
        "fsharpWebview",
        "F# WebView",
        ViewColumn.One,
        createObj [ "enableScripts" ==> true ]
    )

    panel.webview.html <- """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>F# WebView</title>
        </head>
        <body>
            <h1>Hello from F# WebView!</h1>
        </body>
        </html>
    """

    // メッセージハンドラを設定
    panel.webview.onDidReceiveMessage(fun message ->
        match message?command with
        | "hello" -> vscode.window.showInformationMessage("Hello from WebView!") |> ignore
        | _ -> ()
    ) |> ignore

    currentPanel <- NullableT panel

let activate (context: ExtensionContext) : unit =
    let helloWorldCommand = vscode.commands.registerCommand("claude-chat-app.helloWorld", fun _ ->
        vscode.window.showInformationMessage("Hello World from F#!")
        |> ignore
    )

    let showWebviewCommand = vscode.commands.registerCommand("claude-chat-app.showWebview", fun _ ->
        createWebview context
    )

    context.subscriptions.Add(helloWorldCommand)
    context.subscriptions.Add(showWebviewCommand)

let deactivate () : unit =
    if currentPanel = Null
    then ()
    else currentPanel.Value.dispose()


let exports = createObj [
    "activate" ==> activate
    "deactivate" ==> deactivate
]

exportDefault exports