const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario) {
  window.location.href = "../login/index.html";
} else {
  document.getElementById("nome").textContent = usuario.nome;
  document.getElementById("id").textContent = usuario.id;
  document.getElementById("email").textContent = usuario.email;
  document.getElementById("senha").textContent = usuario.senha;
}

function logout() {
  sessionStorage.removeItem("usuario");
  window.location.href = "../home/index.html";
}

        const apiKey = '772e6de7321f4f0bbeec40d77b0e723a'; // 🔑 Insira sua chave da NewsAPI aqui
        const url = `https://newsapi.org/v2/everything?q=health OR medicine OR hospital OR disease&language=pt&sortBy=publishedAt&apiKey=${apiKey}`;

        async function carregarNoticias() {
            try {
                const response = await fetch(url);
                const data = await response.json();

                const container = document.getElementById('newsContainer');
                container.innerHTML = '';

                if (data.articles.length === 0) {
                    container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
                    return;
                }

                data.articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'news-card';

                    card.innerHTML = `
                        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=Sem+Imagem'}" alt="Imagem da notícia">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'Sem descrição disponível.'}</p>
                        <a href="${article.url}" target="_blank">Leia mais</a>
                    `;

                    container.appendChild(card);
                });

            } catch (error) {
                console.error('Erro ao carregar notícias:', error);
                document.getElementById('newsContainer').innerHTML = '<p>Erro ao carregar notícias.</p>';
            }
        }

        carregarNoticias();
