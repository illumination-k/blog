export function headings(ast) {
    const headings = ast.children
        .filter((t) => t.type === "heading")
        .filter((t) => t.depth <= 3)

    return headings
}

export default function extractHeadings() {
    return (node, file) => {
        file.data.headings = headings(node)
    }
}