<template>
    <div>

        <div v-if="notes">
            <note v-for="note in notes" :key="note.id" :note="note"></note>

            <nav>
                <ul class="pagination justify-content-end">
                    <li class="page-item" @click="getNotes(prevPage)" v-if="prevPage">
                        <button class="page-link">
                            <i class="typcn typcn-chevron-left-outline"></i>
                        </button>
                    </li>
                    <li class="page-item" :class="page == currentPage ? 'active' : ''" v-for="page in pages" :key="page" @click="getNotes(page)">
                        <button class="page-link">{{ page }}</button>
                    </li>
                    <li class="page-item" @click="getNotes(nextPage)" v-if="nextPage">
                        <button class="page-link">
                            <i class="typcn typcn-chevron-right-outline"></i>
                        </button>
                    </li>
                </ul>
            </nav>

        </div>

        <div v-else>
            <h3 class="no-notes"> You have no notes yet.</h3>
        </div>
    </div>
</template>

<script>

    import note from './note'

    export default {

        components: {
            note,
        },

        data() {
            return {
                data: null,
                notes: null,
                meta: null,
                currentPage: null,
                pages: null,
                prevPage: null,
                nextPage: null
            }
        },

        created() {
            this.getNotes();
        },

        methods: {
            getNotes(page = 1) {
                this.$store.dispatch('getNotes', page)
                    .then(() => {

                        this.data = this.$store.getters.getNotes;
                        if(!this.data || this.data.data.length === 0) return;
                        this.notes =  this.data.data;
                        this.meta = this.data.meta;
                        this.pages = this.meta.last_page;
                        this.currentPage = this.meta.current_page;
                        this.nextPage = this.currentPage == this.pages ?  null : this.currentPage + 1;
                        this.prevPage = this.currentPage == 1 ? null : this.currentPage - 1;

                    });
            }
        },

    }
</script>


<style scoped lang="scss">

    .page-item {
        &.active {
            .page-link {
                background-image: linear-gradient(to right, #00f6d8, #00f4cd, #00f2c1, #00f0b4, #00eda7);
            }
        }
        .page-link {
            border-radius: 50% !important;
            margin: 2px;
            width: 32px;
            height: 32px;
            border: 0px;
            box-shadow: 0px 4px 15px 1px #ddd, -1px -1px 10px #e5e5e5;
            display: flex;
            justify-content: center;
        }
    }

    .no-notes {
        box-shadow: 0px 4px 15px 1px #ddd, -1px -1px 10px #e5e5e5;
        padding: 1rem;
        text-align: center;
        color: #ff5252;
    }
</style>
