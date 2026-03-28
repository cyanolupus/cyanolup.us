document.addEventListener("DOMContentLoaded", () => {
    const buildUI = () => {
        const h1 = document.querySelector("h1");
        if (h1 && !h1.querySelector('.breadcrumb')) {
            const pathname = window.location.pathname;
            const parts = pathname.split('/').filter(p => p && p !== 'index.html');
            
            const breadcrumb = document.createElement("span");
            breadcrumb.className = "breadcrumb";
            
            let html = `<a href="/">~</a>`;
            let currentPath = "/";
            
            parts.forEach(part => {
                if (part.endsWith('.html')) {
                    html += ` / <a href="${currentPath}${part}">${part.replace('.html', '')}</a>`;
                } else {
                    currentPath += part + "/";
                    html += ` / <a href="${currentPath}">${part}</a>`;
                }
            });

            breadcrumb.innerHTML = html;
            h1.appendChild(breadcrumb);
        }

        const mailLinks = document.querySelectorAll('a[href^="JavaScript:mail_to" i]:not([data-hover-url])');
        mailLinks.forEach(mailLink => {
            if (typeof window.converter === "function") {
                try {
                    const core = window.converter(String.fromCharCode(108,100,63,98,120,107,111,45,116,114,62,114,116,97,105,100,98,115,60));
                    const match = mailLink.getAttribute("href").match(/mail_to\(['"](.*?)['"]\s*,\s*['"](.*?)['"]\)/);
                    
                    if (match) {
                        const decodedUrl = "mailto:" + escape(match[1]) + core + escape(match[2]);
                        mailLink.setAttribute("data-hover-url", decodedUrl);
                    }
                } catch (e) {
                    console.error("Failed to decrypt email node:", e);
                }
            }
        });
    };

    buildUI();

    const observer = new MutationObserver(() => {
        buildUI();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
