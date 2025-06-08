const iframe = document.createElement('iframe');
iframe.height = '232';
iframe.width = '25%';
iframe.style.borderRadius = '12px';
iframe.style.border = 'none';
iframe.src = 'https://open.spotify.com/embed/show/6ISrYY3xwVvIBqp8gqWNOx?si=707452f565f34240';
iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
iframe.loading = 'lazy';

document.getElementById('podcast-container').appendChild(iframe);