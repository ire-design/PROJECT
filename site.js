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

    //display song details
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

    async function getLyrics(artist, songTitle){
        const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
        const data = await response.json()

         // Format the lyrics by replacing newlines with <br>
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        //display them lyrics
        result.innerHTML = `
                <h2><strong>${artist}</strong> - ${songTitle}
                    <button class="btn like-btn" data-artist="${artist}" data-songtitle="${songTitle}">
                        <span class="heart">&#9825;</span> Like
                    </button>
                </h2><span>${lyrics}</span>
            `;
            
            more.innerHTML = '';
    }

    // Event listener for form submission
    form.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission
        const searchTerm = search.value.trim(); // Get the search term and trim any extra spaces
        if (!searchTerm) {
            alert('Please type something..'); 
        } else {
            searchSongs(searchTerm); 
        }
    });

});