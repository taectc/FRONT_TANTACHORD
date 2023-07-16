import { useEffect, useState } from "react";
import { getPlaylistById, getChordlistByPlaylistId, updatePlaylist, updateChordlist } from "../api/tantachordApi";

import { useNavigate, useParams } from "react-router-dom";
import YouTube from 'react-youtube'

export default function EditPlaylist() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [player, setPlayer] = useState(null)

    const [input, setInput] = useState({
        musicName: "",
        youtubeEmbed: "",
    })

    const [inputChordlist, setInputChordlist] = useState([{
        time: '',
        chord: ''
    }])

    const opts = {
        height: '400px',
        width: '600px',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: false,
        },

    };

    const readyToPlay = (event) => {
        setPlayer(event.target)
        console.log(event.target)
    }

    useEffect(() => {
        getPlaylistById(id).then((rs) => {
            setInput(rs.data);
            console.log(rs.data)
        });
        getChordlistByPlaylistId(id).then((rs) => {
            setInputChordlist(rs.data);
        });
    }, [id]);

    const hdlChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const hdlChangeChordInput = (e, index) => {
        const { name, value } = e.target
        const list = [...inputChordlist]
        list[index][name] = value
        setInputChordlist(list)
    }

    const hdlAddclick = () => {
        setInputChordlist([...inputChordlist, { time: '', chord: '' }])
    }

    const hdlRemove = index => {
        const list = [...inputChordlist]
        list.splice(index, 1)
        setInputChordlist(list)
    }

    const hdlSubmit = e => {
        let token = localStorage.getItem('token')
        e.preventDefault();
        // validation
        updatePlaylist(id, { musicName: player.videoTitle, youtubeEmbed: input.youtubeEmbed }, token)
            .then(updateChordlist(id, inputChordlist))
            .then((rs) => {
                console.log(rs)
                navigate("/");
            });
    }

    return (

        <div className="Playlist mt-5 w-full text-gray-600 flex flex-col justify-center outline-none  items-center">
            <div className=" flex  bg-color-3 w-[650px] rounded-xl shadow-md h-fit my-10 flex-wrap align-middle justify-center">

                <form onSubmit={hdlSubmit} className="p-5 text-xl w-full rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider flex gap-5 flex-col">

                    <YouTube videoId={input.youtubeEmbed} opts={opts} onReady={readyToPlay}/>

                    <div className="musicName">
                        <h2 className=" text-[16pt] text-white">{player?.videoTitle}</h2>
                    </div>
                    <div className="youtubeEmbed">
                        <input
                            className="w-full p-2.5 border  text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider"
                            type="text"
                            placeholder="youtubeEmbed"
                            name="youtubeEmbed"
                            value={input.youtubeEmbed}
                            onChange={hdlChangeInput}
                        />

                    </div>
                    <div >
                        {inputChordlist.map((x, i) => (
                            <div className="Chordlist" key={i}>
                                <div className=" flex w-full justify-around">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="time"
                                            name="time"
                                            value={x.time}
                                            className="w-full p-2.5 border  text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:-tracking-wide tracking-wider"

                                            onChange={e => hdlChangeChordInput(e, i)}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="chord"
                                            name="chord"
                                            value={x.chord}
                                            className="w-full p-2.5 border  text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:-tracking-wide tracking-wider"

                                            onChange={e => hdlChangeChordInput(e, i)}
                                        />
                                    </div>
                                </div>
                                {
                                    inputChordlist.length !== 1 &&
                                    <button
                                        className="btn btn-circle px-5 my-10 py-3 w-full   border-color-2 border text-white font-bold text-[14pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'"
                                        type="button"
                                        onClick={() => hdlRemove(i)}>Remove</button>
                                }
                                {
                                    inputChordlist.length - 1 === i &&
                                    <button
                                        className="btn btn-circle px-5 mt-3 py-3 w-full bg-color-2 border-color-2 border text-white font-bold text-[18pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'"
                                        type="button"
                                        onClick={hdlAddclick}>Add Chord</button>
                                }

                            </div>
                        ))}
                    </div>

                    <div>
                        <button type="submit"
                            className="btn btn-circle px-5 py-3 w-full bg-color-2 text-white font-bold text-[18pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75'">

                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>





    )
}