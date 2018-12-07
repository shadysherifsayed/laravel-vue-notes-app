<template>
    <div v-if="!deleted"  class="note" :id="note.id">
        <div class="note-title">
            <h4> {{ note.title }} </h4>
            <small> {{ note.created_at }} </small>
        </div>
        <div class="note-description" v-html="note.description">
        </div>
        <div class="note-actions">
            <router-link class="btn edit" :to="{name: 'notes.edit', params: {note: note.slug}}"> Edit </router-link>
            <button @click="deleteNote" class="btn delete"> Delete </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            note: Object
        },

        data() {
            return {
                deleted: false
            }
        },
        methods: {
            deleteNote() {
                this.$store.dispatch('removeNote', this.note)
                    .then(() => {
                        this.deleted = true;
                    })
            }
        },
    }
</script>

<style scoped lang="scss">
    .note {
        box-shadow: 0px 4px 15px 1px #ddd, -1px -1px 10px #e5e5e5;
        margin: 1rem;
        > * {
            padding: 1rem;
        }
        .note-title {
            border-bottom: 1px dashed #848484;
            display: flex;
            flex-direction: 1fr;
            align-items: center;
            align-content: center;
            h4 {
                flex: 1;
            }
            * {
                margin-bottom: 0;
            }
        }
        .note-actions {
            .btn {
                color: #FFF;
                font-weight: bold;
            }
            .edit {
                background-image: linear-gradient(to right, #00f6d8, #00f4cd, #00f2c1, #00f0b4, #00eda7);
            }
            .delete {
                background-image: linear-gradient(to right, #ff9f2e, #ff952e, #ff8a2f, #ff7f31, #ff7434);
            }
        }
    }
</style>
