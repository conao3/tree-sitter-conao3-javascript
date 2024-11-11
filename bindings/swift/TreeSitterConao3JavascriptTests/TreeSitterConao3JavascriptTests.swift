import XCTest
import SwiftTreeSitter
import TreeSitterConao3Javascript

final class TreeSitterConao3JavascriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_conao3_javascript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Conao3Javascript grammar")
    }
}
