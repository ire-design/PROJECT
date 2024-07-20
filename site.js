document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    const search = document.getElementById('search')
    const result = document.getElementById('result')
    const more = document.getElementById('more')
    const themeToggle = document.getElementById('theme-toggle')

    // my API
    const apiURL = 'https://api.lyrics.ovh'

    // searchsongs async fn
    async function searchsongs(term){
        const response = await fetch(`${apiURL}/suggest/${term}`)
        const data = await response.json()

        showData(data);
    }

    //display the song details
    function showData(data){
        result.innerHTML = `
            <ul class="songs">
                ${data.data.map(song => `  
                    <li>
                        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                    </li>
                `).join('')}
            </ul>
        `;

        more.innerHTML = ''
    }

    

});