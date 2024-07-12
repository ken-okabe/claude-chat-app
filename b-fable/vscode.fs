module Fable.VSCode

open Fable.Core
open Timeline.Nullable
open Timeline.Timeline
open PromiseTimeline

type [<AllowNullLiteral>] ExtensionContext =
    abstract subscriptions: ResizeArray<IDisposable>

and [<AllowNullLiteral>] IDisposable =
    abstract dispose: unit -> unit

type [<AllowNullLiteral>] CommandsStatic =
    abstract registerCommand: command: string * callback: (ResizeArray<obj> -> unit) -> IDisposable

and [<RequireQualifiedAccess>] ViewColumn =
    | Active = -1
    | Beside = -2
    | One = 1
    | Two = 2
    | Three = 3
    | Four = 4
    | Five = 5
    | Six = 6
    | Seven = 7
    | Eight = 8
    | Nine = 9

type [<AllowNullLiteral>] Webview =
    abstract html: string with get, set
    abstract onDidReceiveMessage: listener: (obj -> unit) -> IDisposable
    abstract postMessage: message: obj -> JS.Promise<bool>

and [<AllowNullLiteral>] WebviewPanel =
    abstract webview: Webview
    abstract dispose: unit -> unit
    abstract onDidDispose: listener: (unit -> unit) -> IDisposable
    abstract reveal: ?column: ViewColumn -> unit

type [<AllowNullLiteral>] WindowStatic =
    abstract showInformationMessage: message: string -> JS.Promise<string>
    abstract createWebviewPanel: viewType: string * title: string * column: ViewColumn * options: obj -> WebviewPanel

type [<AllowNullLiteral>] VSCodeStatic =
    abstract commands: CommandsStatic
    abstract window: WindowStatic


[<ImportAll("vscode")>]
let vscode: VSCodeStatic = jsNative

let registerCommand (command: string) (callback: ResizeArray<obj> -> unit) : IDisposable =
    vscode.commands.registerCommand(command, callback)

let showInformationMessage (message: string) : Timeline<NullableT<string>> =
    promiseToTimelineTask (vscode.window.showInformationMessage(message))

let createWebviewPanel (viewType: string) (title: string) (column: ViewColumn) (options: obj) : Timeline<NullableT<WebviewPanel>> =
    Timeline (T (vscode.window.createWebviewPanel(viewType, title, column, options)))

let postMessage (webview: Webview) (message: obj) : Timeline<NullableT<bool>> =
    promiseToTimelineTask (webview.postMessage(message))