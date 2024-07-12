import * as vscode from "vscode";
import { promiseToTimelineTask } from "./promise-timeline.fs.js";
import { Timeline } from "../a-libs/timeline/timeline.fs.js";
import { NullableT$1 } from "../a-libs/timeline/x-nullable.fs.js";

export function registerCommand(command, callback) {
    return vscode.commands.registerCommand(command, callback);
}

export function showInformationMessage(message) {
    return promiseToTimelineTask(vscode.window.showInformationMessage(message));
}

export function createWebviewPanel(viewType, title, column, options) {
    return Timeline(new NullableT$1(1, [vscode.window.createWebviewPanel(viewType, title, column, options)]));
}

export function postMessage(webview, message) {
    return promiseToTimelineTask(webview.postMessage(message));
}

