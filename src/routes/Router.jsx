import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom'

import NotFound from '../pages/NotFound.jsx'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import Playlist from '../pages/Playlist'
import EditPlaylist from '../pages/EditPlaylist'
import CreatePlaylist from '../pages/CreatePlaylist'
import Player from '../pages/Player'
import AdminPlaylist from '../pages/AdminPlaylist.jsx'

export default function Router() {
    const { user } = useAuth()

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <>
                    <Header />
                    <Outlet />
                </>
            ),
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <Playlist />
                },
                {
                    path: `/admin`,
                    element: user?.isAdmin ? <AdminPlaylist /> : <Navigate to='/' />
                },
                {
                    path: '/createplaylist',
                    element: user ? <CreatePlaylist /> : <Navigate to='/' />
                },
                {
                    path: '/player/:id',
                    element: <Player />
                },
                {
                    path: '/editplaylist/:id',
                    element: user ? <EditPlaylist /> : <Navigate to='/' />
                },
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
