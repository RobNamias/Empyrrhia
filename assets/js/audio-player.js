let currentTrackIdx = 0;
// Lecteur audio dynamique avec playlist chargée depuis playlist.json
const player = document.getElementById('player');
const playlistDiv = document.getElementById('playlist');


function renderPlaylist(playlist) {
    playlistDiv.innerHTML = '';
    playlist.forEach((track, idx) => {
        const li = document.createElement('li');
        li.className = 'playlist-track';
        if (idx === currentTrackIdx) li.classList.add('active');
        li.onclick = () => {
            player.src = track.file;
            currentTrackIdx = idx;
            renderPlaylist(playlist);
            player.play();
        };
        // Icône de lecture pour la piste active
        if (idx === currentTrackIdx) {
            li.innerHTML = '<span class="track-icon">&#9654;</span>' + track.title;
        } else {
            li.innerHTML = '<span class="track-icon"></span>' + track.title;
        }
        playlistDiv.appendChild(li);
    });
}

fetch('assets/music/playlist.json')
    .then(response => response.json())
    .then(playlist => {
        if (playlist.length > 0) {
            player.src = playlist[0].file;
            currentTrackIdx = 0;
        }
        renderPlaylist(playlist);
    })
    .catch(err => {
        playlistDiv.innerHTML = '<em>Erreur de chargement de la playlist.</em>';
    });
