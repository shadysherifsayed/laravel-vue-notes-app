<template >

    <form class="container my-2" @submit.prevent="formSubmit">
        <div class="form-group">
            <p class="error" v-if="titleErr" v-text="titleErr"></p>
            <label for="title">Title</label>
            <input type="text" class="form-control" name="title" id="title" v-model="title" placeholder="Title">
        </div>

        <p class="error" v-if="descriptionErr" v-text="descriptionErr"></p>
        <label for="title">Description</label>
        <vue-editor id="editor" v-model="description" placeholder="Description"></vue-editor>

        <button type="submit" class="btn btn-dark"> Update </button>
    </form>
</template>

<script>
    import { VueEditor } from "vue2-editor";

    export default {
        components: {
            VueEditor
        },

        data() {
            return {
                title: '',
                description: '',
                note: null,
                errors: {}
            }
        },

        computed: {
            titleErr() {
                return this.getError('title');
            },
            descriptionErr() {
                return this.getError('description');
            },
        },

        created() {

            this.$store.dispatch('getNote', this.$route.params.note)
                .then( note => {
                    this.note = note;
                    this.title = note.title;
                    this.description = note.description;
                })
                .catch(error => {
                })
        },

        methods: {

             getError(key) {
                if(!this.errors || !this.errors[key]) return '';
                return this.errors[key][0]
            },
            formSubmit(e) {
                let data = {
                    newNote: {
                    title: this.title,
                    description: this.description
                    },
                    oldNote: this.note
                }

                this.$store.dispatch('updateNote', data)
                    .then(() => {
                        this.$snotify.success('Note is updated successfully.');
                    })
                    .catch((errors) => {
                        this.$snotify.error('Something went wrong!');
                        this.errors = errors.errors;
                    })
            },
        },
    }
</script>


<style scoped lang="scss">
    $secondary: #4b6584;
    button.btn {
        margin: 1rem auto;
        width: 300px;
        display: block;
        background: $secondary;
        transition: 0.5s all;
        border: 0px;
        box-shadow: -2px 5px 10px $secondary;

        &:hover {
            background: darken($secondary, 10);
        }
    }

    label {
        font-weight: bold;
        font-style: italic;
    }
    .form-control {
        border-radius: 0px;
        border-color: transparent !important;
        box-shadow: -2px 5px 10px #dedede;
        background: transparent;
        &:focus,
        &:hover {
            border-color: $secondary;
            outline: none;
            box-shadow: -2px 5px 10px #dedede;
        }
    }

</style>
