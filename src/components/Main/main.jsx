import styles from './main.module.scss';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Library } from './component/library';
import { Info } from './component/info';
import { ForYou } from './component/foryou';
import { useResizable } from '../../hooks/useResizable';

export function Main() {
    const library = useResizable(1000);
    const info = useResizable(1000);

    const isResizing = useSelector((state) => state.isResizing);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [albumCover, setAlbumCover] = useState(null);
    const [index, setIndex] = useState(null);
    const [selectedActivePlaylist, setActivePlaylist] = useState(null);
    
    const handleSelectPlaylist = (playlist, index = null) => {
        setSelectedPlaylist(playlist);
        setIndex(index);
    }
    const handleSelectSong = (song, albumCover) => {
        setSelectedSong(song);
        setAlbumCover(albumCover);
    }
    const handleSelectActivePlaylist = (playlist) => {
        setActivePlaylist(playlist);
    }
    useEffect(() => {
        fetch('http://localhost:8080/auth/data') 
          .then(response => response.json())
          .then(data => setPlaylists(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            <Library 
                width={library.width} 
                onResize={library.handleMouseDown} 
                playlists={playlists} 
                onSelectPlaylist={handleSelectPlaylist}/>
            <ForYou 
                selectedPlaylist={selectedPlaylist} 
                onSelectSong={handleSelectSong}
                id={index} />
            <Info 
                width={info.width} 
                onResize={info.handleMouseDown} 
                selectedSong={selectedSong} 
                selectedPlaylist={selectedPlaylist}
                albumCover={albumCover}/>
        </div>
    );
}

