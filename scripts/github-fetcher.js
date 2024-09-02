const username = 'kubilaiswf';
const token = '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'; 

fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
        'Authorization': `token ${token}` // Yetkilendirme 
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('GitHub API isteği başarısız oldu: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        displayRepos(data);
    })
    .catch(error => console.error('GitHub reposları çekilirken hata oluştu:', error));

function displayRepos(repos) {
    const repoList = document.getElementById('repo-list');
    
    repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'mb-3');

        const link = document.createElement('a');
        link.href = repo.html_url;
        link.textContent = repo.name;
        link.target = '_blank';
        link.classList.add('font-weight-bold');

        const description = document.createElement('p');
        description.textContent = repo.description ? repo.description : 'Açıklama bulunmuyor';
        description.classList.add('mb-1', 'text-muted');

        listItem.appendChild(link);
        listItem.appendChild(description);
        
        repoList.appendChild(listItem);
    });
}
