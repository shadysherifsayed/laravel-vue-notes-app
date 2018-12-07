import NotesIndex from '../components/notes/index';
import NotesAdd from '../components/notes/add';
import NotesUpdate from '../components/notes/update';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import Profile from '../components/auth/profile';

export default [
    {
        path: '/',
        name: 'notes.index',
        component: NotesIndex,
        meta: {
            auth: true
        }
    },
    {
        path: '/api/notes/:note',
        name: 'notes.single'
    },
    {
        path: '/add',
        name: 'notes.add',
        component: NotesAdd,
        meta: {
            auth: true
        }
    },

    {
        path: '/edit/:note',
        name: 'notes.edit',
        component: NotesUpdate,
        meta: {
            auth: true
        }
    },

    {
        path: '/profile/:username',
        name: 'profile',
        component: Profile,
        meta: {
            auth: true
        }
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            guest: true
        }
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            guest: true
        }
    }
]
