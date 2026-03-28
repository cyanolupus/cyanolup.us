document.addEventListener("DOMContentLoaded", async () => {
    const hiddenLink = document.createElement('a');
    hiddenLink.href = `./index.md`;
    hiddenLink.hidden = true;
    hiddenLink.textContent = "Raw Markdown";
    document.body.appendChild(hiddenLink);

    const main = document.getElementById('content');
    if (!main) return;

    try {
        const res = await fetch(`./index.md`);
        if (!res.ok) throw new Error("Failed to fetch markdown source.");
        const md = await res.text();

        const h1Match = md.match(/^#\s+(.+)$/m);
        if (h1Match) {
            document.title = h1Match[1];
        }

        main.innerHTML = marked.parse(md);
        
        if (window.hljs) hljs.highlightAll();
        
    } catch (err) {
        main.innerHTML = `<pre>error: ${err.message}</pre>`;
    }
});
