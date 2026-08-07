import Foundation
import ApplicationServices

func stringValue(_ value: CFTypeRef?) -> String? {
    guard let value else { return nil }
    if CFGetTypeID(value) == CFStringGetTypeID() {
        return value as? String
    }
    if CFGetTypeID(value) == CFBooleanGetTypeID() {
        return ((value as! CFBoolean) == kCFBooleanTrue) ? "true" : "false"
    }
    if CFGetTypeID(value) == AXValueGetTypeID() {
        return nil
    }
    return "\(value)"
}

func attr(_ element: AXUIElement, _ name: String) -> String? {
    var value: CFTypeRef?
    let err = AXUIElementCopyAttributeValue(element, name as CFString, &value)
    if err != .success { return nil }
    return stringValue(value)
}

func children(_ element: AXUIElement) -> [AXUIElement] {
    var value: CFTypeRef?
    let err = AXUIElementCopyAttributeValue(element, kAXChildrenAttribute as CFString, &value)
    if err != .success { return [] }
    return (value as? [AXUIElement]) ?? []
}

func dump(_ element: AXUIElement, depth: Int, maxDepth: Int, lines: inout [String], maxLines: Int) {
    if depth > maxDepth || lines.count >= maxLines { return }
    let role = attr(element, kAXRoleAttribute) ?? ""
    let title = attr(element, kAXTitleAttribute) ?? ""
    let description = attr(element, kAXDescriptionAttribute) ?? ""
    let value = attr(element, kAXValueAttribute) ?? ""
    if !title.isEmpty || !description.isEmpty || !value.isEmpty || role == "AXWebArea" {
        let prefix = String(repeating: "  ", count: depth)
        lines.append("\(prefix)\(role)|title=\(title)|desc=\(description)|value=\(value)")
    }
    for child in children(element) {
        dump(child, depth: depth + 1, maxDepth: maxDepth, lines: &lines, maxLines: maxLines)
        if lines.count >= maxLines { return }
    }
}

let pidArg = CommandLine.arguments.dropFirst().first
let pid: pid_t
if let pidArg, let parsed = Int32(pidArg) {
    pid = parsed
} else {
    let task = Process()
    task.executableURL = URL(fileURLWithPath: "/usr/bin/pgrep")
    task.arguments = ["-x", "Google Chrome"]
    let pipe = Pipe()
    task.standardOutput = pipe
    try task.run()
    task.waitUntilExit()
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output = String(data: data, encoding: .utf8) ?? ""
    pid = Int32(output.split(separator: "\n").first ?? "0") ?? 0
}

if pid == 0 {
    fputs("No Google Chrome pid found\n", stderr)
    exit(1)
}

let app = AXUIElementCreateApplication(pid)
var windowRef: CFTypeRef?
let windowErr = AXUIElementCopyAttributeValue(app, kAXFocusedWindowAttribute as CFString, &windowRef)
let root = (windowErr == .success && windowRef != nil) ? (windowRef as! AXUIElement) : app

var lines: [String] = []
dump(root, depth: 0, maxDepth: 40, lines: &lines, maxLines: 2000)
print(lines.joined(separator: "\n"))
