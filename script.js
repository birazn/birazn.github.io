document.addEventListener('DOMContentLoaded', () => {
  const repositorioLista = document.getElementById('repositorios-lista');
  const username = 'SEU_NOME_DE_USUARIO_GITHUB'; // Substitua pelo seu nome de usuário do GitHub

  fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
          repositorioLista.innerHTML = ''; // Limpa a mensagem de carregamento
          if (data.length === 0) {
              repositorioLista.innerHTML = '<p>Nenhum repositório encontrado.</p>';
              return;
          }
          data.forEach(repo => {
              const repoDiv = document.createElement('div');
              repoDiv.classList.add('repositorio-item');
              repoDiv.innerHTML = `
                  <h3>${repo.name}</h3>
                  <p>${repo.description ? repo.description : 'Sem descrição.'}</p>
                  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
              `;
              repositorioLista.appendChild(repoDiv);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar repositórios:', error);
          repositorioLista.innerHTML = '<p>Erro ao carregar os repositórios.</p>';
      });
});