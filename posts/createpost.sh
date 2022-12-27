#!/bin/bash

cwd=$(pwd)
cd $1

title=$(cat index.md | ggrep -oP '(?<=^# ).*(?=)')

header="<!doctype html>
<html>
<head>
<meta charset='UTF-8'><meta name='viewport' content='width=device-width initial-scale=1'>
<meta name='viewport' content='width=device-width,initial-scale=1.0'>
<link rel='shortcut icon' href='https://cyanolup.us/img/icon_trs_low.png' type='image/x-icon'>
<meta property='og:type' content='website'>
<meta property='og:url' content='cyanolup.us'>
<meta property='“og:image”' content='https://cyanolup.us/img/icon.jpg'>
<meta name='twitter:card' content='summary'>
<meta name='twitter:site' content='@cyanolupus'>
<meta name='“twitter:image”' content='https://cyanolup.us/img/icon.jpg'>
<link rel='stylesheet' href='https://cyanolup.us/css/main.css' type='text/css'>
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css'>
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'>
<meta property='og:description' content='さいあの/るぷす'>
<meta property='og:title' content='$title'>
<title>$title</title>
</head>
<body>"

footer="<sub><script>document.write(location.pathname);</script></sub>
<script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'></script>
<script>hljs.initHighlightingOnLoad();</script>
</body>
</html>"

pandocres="$(pandoc index.md)"

echo "$header$pandocres$footer" > index.html

cd $cwd
