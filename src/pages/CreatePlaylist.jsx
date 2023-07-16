import { useState } from "react";
import { createPlaylist } from "../api/tantachordApi";
import { useNavigate } from "react-router-dom";
import YouTube from 'react-youtube'


export default function CreatePlaylist() {
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null)
    const [input, setInput] = useState({ youtubeEmbed: '' })
    const [inputChordlist, setInputChordlist] = useState([{ time: '', chord: '' }])

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

    const hdlRemove = (index) => {
        const list = [...inputChordlist];
        list.splice(index, 1);
        setInputChordlist(list);
      };
      

    const hdlSubmit = e => {

        let token = localStorage.getItem('token')
        e.preventDefault()

        createPlaylist(
            { musicName: player.videoTitle, youtubeEmbed: input.youtubeEmbed },
            inputChordlist
            , token
        ).then(rs => {
            console.log(rs),
                navigate("/")
        }).catch(err => console.log(err))
    }


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

    return (

        <div className="Playlist  mt-5 w-full text-gray-600 flex flex-col justify-center outline-none  items-center">
            <div className=" flex  bg-color-3 w-[650px] rounded-xl shadow-md h-fit my-10 flex-wrap align-middle justify-center">

                <form onSubmit={hdlSubmit} className="p-5 text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider flex gap-5 flex-col">

                    <YouTube videoId={input.youtubeEmbed} opts={opts} onReady={readyToPlay} />

                    <div className="musicName">
                        <h2 className=" text-[20pt] text-white">{player?.videoTitle}</h2>
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
                                            className="w-full p-2.5 border  text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider"
                                            type="text"
                                            placeholder="chord"
                                            name="chord"
                                            value={x.chord}
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





