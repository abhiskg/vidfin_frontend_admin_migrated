//
I just remove the paragraphs from the generated HTML:
html.replaceAll(/<li><p>(.\*?)<\/p><(\/?)(ol|li|ul)>/gi, "<li>$1<$2$3>")

".ProseMirror": {
"ul,ol": {
padding: "0 1rem",
p: {
margin: 0,
},
},
}
