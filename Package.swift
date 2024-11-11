// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterConao3Javascript",
    products: [
        .library(name: "TreeSitterConao3Javascript", targets: ["TreeSitterConao3Javascript"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterConao3Javascript",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterConao3JavascriptTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterConao3Javascript",
            ],
            path: "bindings/swift/TreeSitterConao3JavascriptTests"
        )
    ],
    cLanguageStandard: .c11
)
