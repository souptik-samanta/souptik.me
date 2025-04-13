const markdownUrls = [
    'https://raw.githubusercontent.com/souptik-samanta/ChaosCompiler/refs/heads/main/README.md',
    'https://raw.githubusercontent.com/souptik-samanta/ChaosCompiler/refs/heads/main/notes.md'
  ];
  
  const containerIds = ['markdown1', 'markdown2'];
  
  markdownUrls.forEach((url, index) => {
    fetch(url)
      .then(res => res.text())
      .then(md => {
        const html = marked.parse(md);
        document.getElementById(containerIds[index]).innerHTML = html;
      })
      .catch(err => {
        document.getElementById(containerIds[index]).innerHTML = `<p>Error loading content.</p>`;
        console.error('Markdown load error:', err);
      });
  });
  