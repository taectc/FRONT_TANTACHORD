import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePlaylist, searchPlaylist } from "../api/tantachordApi";
import { useAuth } from "../contexts/AuthContext";
import YouTube from 'react-youtube';

export default function Playlist() {
    const { user } = useAuth();
    const [playlist, setPlaylist] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    const opts = {
        height: '400px',
        width: '600px',
        className: "rounded-2xl",
        playerVars: {
            autoplay: false,
        },
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        console.log(user.isAdmin)
    };

    const hdlRemove = index => {
        const list = [...playlist];
        deletePlaylist(list[index].id);
        list.splice(index, 1);
        setPlaylist(list);
    };



    useEffect(() => {
        const id = setTimeout(() => {
            searchPlaylist({ search: searchValue }).then(rs => {
                setPlaylist(rs.data);
            });
        }, 500);
        return () => clearTimeout(id);
        
    }, [searchValue]);

    return (
        <div className="mt-5 w-full text-gray-600 flex flex-col justify-center outline-none items-center">
            <input
                type='text'
                className='header__search__input m-5 p-5 text-xl w-[50%] rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider '
                placeholder='search MUSIC NAME'
                onChange={handleChange}
                value={searchValue}
            />
            {playlist?.map((el, index) => (
                <div className="flex bg-color-3 w-[650px] rounded-xl shadow-md h-fit my-10 flex-wrap align-middle justify-center" key={index}>
                    <div className="flex flex-col justify-end h-fit w- p-5">
                        <YouTube videoId={el.youtubeEmbed} opts={opts} />
                        <div className="flex gap-1 flex-col w-full pt-3 text-lg">
                            <h2 className="text-[16pt] text-white">{el.musicName}</h2>
                            <h2 className="text-yellow-400">{el.User.username}</h2>
                            <Link className='btn btn-circle px-5 py-3 w-full bg-color-2 text-white font-bold text-[24pt] text-center rounded-xl hover:bg-color-1 active:scale-95 transition duration-75' to={`/player/${el.id}`}>Play</Link>
                            {user?.id === el.userId &&
                                <div className="text-color-1 underline flex w-full justify-end gap-3">
                                    <Link className='btn btn-circle hover:text-white' to={`/editplaylist/${el.id}`}>Edit</Link>
                                    <button className="hover:text-white" type="button" onClick={() => hdlRemove(index)}>Remove</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
