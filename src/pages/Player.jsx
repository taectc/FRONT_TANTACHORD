import { useState, useEffect } from "react";
import YouTube from 'react-youtube'
import { getPlaylistById, getChordlistByPlaylistId } from "../api/tantachordApi";
import { useParams } from "react-router-dom";


export default function Player() {
    const { id } = useParams();

    const [videoTime, setVideoTime] = useState(0)
    const [player, setPlayer] = useState(null)

    const [chordId, setChordId] = useState(0)
    const [chord, setChord] = useState(" ")

    // Fetch
    const [playlist, setPlaylist] = useState(" ")
    const [chordlist, setChordlist] = useState([])

    const opts = {
        height: '400px',
        width: '600px',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: false,
        },

    };

    const onPlay = (event) => {
        function setTime() {
            let currentTime = event.target.getCurrentTime()  // eventใน youtube ตอน run {target: getCyrrentTime, data:}
            setVideoTime(currentTime)
        }
        setInterval(setTime, 100);
    }

    const readyToPlay = (event) => {
        setPlayer(event.target)
    }

    const playButton = (click) => {
        click.playVideo()
    }

    const pauseButton = (click) => {
        click.pauseVideo()
    }

    const seekButton = (click) => {
        click.playVideo()
        if (chordId <= 1) {
            setChordId(chordId)
        } else {
            setChordId(chordId - 1)
            setChord(chordlist[chordId - 2].chord)

            click.seekTo(chordlist[chordId - 2].time - 0.1, true)
        }
    }

    function ShowChord() {
        if (chordId < chordlist.length) {
            if (+chordlist[chordId].time < +videoTime) {
                setChord(chordlist[chordId].chord)
                setChordId(chordId + 1)
            }
        }
    }



    useEffect(() => {
        getChordlistByPlaylistId(id).then(rs => {
            setChordlist(rs.data)
        }),
            getPlaylistById(id).then(rs => {
                setPlaylist(rs.data)
            })
    }, [])

    useEffect(() => {
        ShowChord()
    }, [videoTime])

    useEffect(() => {
        // say(chord)
        responsiveVoice.speak(chord, "Thai Male", { rate: 1.1, volume: 1 });
    }, [chord])






    return (
        <div>

            <div className="Playlist  mt-5 w-full text-gray-600 flex flex-col justify-center outline-none  items-center">
                <div className=" flex  bg-color-3 w-[650px] rounded-xl shadow-md h-fit my-10 flex-wrap align-middle justify-center p-5">

                    <div>
                        <h1 className=" text-[20pt] text-white pb-5">{playlist.musicName}</h1>
                        <div>
                            <YouTube videoId={playlist.youtubeEmbed} opts={opts} onPlay={onPlay} onReady={readyToPlay} />
                            <div className="p-5 text-lg text-color-1 flex justify-between">


                                <h1>{videoTime.toFixed(1)}</h1>
                                <h1>{chord}</h1>
                            </div>


                        </div>
                        <div className=" flex gap-5 justify-around">
                            <button
                                className="btn btn-circle px-5 py-3 w-full bg-color-2 text-white font-bold text-[18pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'"

                                onClick={() => { playButton(player) }}>Play</button>
                            <button
                                className="btn btn-circle px-5 py-3 w-full bg-color-2 text-white font-bold text-[18pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'"

                                onClick={() => { pauseButton(player) }}>Pause</button>
                            <button
                                className="btn btn-circle px-5 py-3 w-full bg-color-2 text-white font-bold text-[18pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'"

                                onClick={() => { seekButton(player) }}>PrevChord</button>
                        </div>
                    </div>



                </div>

            </div>

        </div>

    )
}