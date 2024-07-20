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

    //e listener for clicks kwa div "result"
    result.addEventListener('click', event => {
        const clickedEl = event.target;
        if (clickedEl.tagName === 'BUTTON') {
            const artist = clickedEl.getAttribute('data-artist');
            const songTitle = clickedEl.getAttribute('data-songtitle');
            getLyrics(artist, songTitle);
            //trynna debug the like btn
        } else if (clickedEl.classList.contains('like-btn')) {
            const heart = clickedEl.querySelector('.heart');
            if (heart.innerHTML === '&#9825;') { // not liked
                heart.innerHTML = '&#9829;'; // Liked
                clickedEl.classList.add('liked');
            } else { // Liked state
                heart.innerHTML = '&#9825;'; // Unliked state
                clickedEl.classList.remove('liked');
            }
        }
    });

     // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode'));
    });

        result.addEventListener('click', e => {
        const clickedEl = e.target.closest('.like-btn');

        if (clickedEl && clickedEl.classList.contains('like-btn')) {
            const heart = clickedEl.querySelector('.heart');

            clickedEl.classList.toggle('liked');
            if (clickedEl.classList.contains('liked')) {
                heart.innerHTML = '&#9829;'; // Filled heart
            } else {
                heart.innerHTML = '&#9825;'; // Empty heart
            }
        }
    });
});