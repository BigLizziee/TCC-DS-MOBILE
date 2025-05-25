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
      window.location.href = "../login/index.html";
    }

async function carregarNoticias() {
  const apiKey = 'pub_879174d91ceb134498bd35c625d2ef144856f';  
  const url = `https://newsdata.io/api/1/latest?apikey=pub_879174d91ceb134498bd35c625d2ef144856f&country=br&language=pt&category=health&timezone=America/Sao_Paulo`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const container = document.getElementById('listaNoticias');
    container.innerHTML = '';

    if (data.results && data.results.length > 0) {
      data.results.forEach(noticia => {
        const div = document.createElement('div');
        div.className = 'noticia';

        div.innerHTML = `
          <h2>${noticia.title}</h2>
          <p>${noticia.description || ''}</p>
          <a href="${noticia.link}" target="_blank" rel="noopener">Leia mais</a>
        `;
        container.appendChild(div);
      });
    } else {
      container.textContent = 'Nenhuma notícia encontrada.';
    }
  } catch (error) {
    document.getElementById('listaNoticias').textContent = 'Erro ao carregar notícias.';
    console.error('Erro ao buscar notícias:', error);
  }
}

carregarNoticias(); // <== não esqueça de chamar a função
