export default {
    state: {
        all: []
    },

    getters: {
        getNotes: state => {
            return state.all;
        },
    },

    mutations: {
        revokeNotes: (state) => {
            state.all = [];
        },
        getNotes: (state, notes) => {
            state.all = notes;
        },
        removeNote: (state, removedNote) => {
            state.all = state.all.filter(note => note.id !== removedNote.id);
        },
        addNote: (state, note) => {
            state.all.push(note);
        },
        updateNote: (state, payload) => {
            const { oldNote, updatedNote } = payload;
            state.all.forEach((note, i) => {
                if (note.id === oldNote.id) {
                    state.all[i] = updatedNote;
                }
            });
        },
    },

    actions: {
        getNotes: (context, page = 1) => {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/api/notes?page=${page}`)
                    .then((response) => {
                        context.commit("getNotes", response.data);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },

        getNote: (_, noteKey) => {
            return new Promise((resolve, reject) => {
                axios.get(`/api/notes/${noteKey}`)
                    .then((response) => {
                        resolve(response.data.data);
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },

        removeNote: (context, note) => {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`/api/notes/${note.slug}`)
                    .then(() => {
                        context.commit("removeNote", note);
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },

        addNote: (context, note) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/notes`, note)
                    .then(response => {
                        let addedNote = response.data.data;
                        context.commit("addNote", addedNote);
                        resolve();
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
            });
        },

        updateNote: (context, data) => {
            let {
                oldNote,
                newNote
            } = data;

            return new Promise((resolve, reject) => {
                axios
                    .put(`/api/notes/${oldNote.slug}`, newNote)
                    .then(response => {
                        let updatedNote = response.data.data;
                        data = {
                            oldNote,
                            updatedNote
                        };
                        context.commit("updateNote", data);
                        resolve();
                    })
                    .catch(error => {
                        if (error && error.response) {
                            reject(error.response.data);
                        }
                    });
            });
        }
    }
};
