<template>
    <div>
        <Header :navBread="navBread" showSearch="showSearch"></Header>
        <div class="container">
            <div class="row">
                <h4 class="search-title"></h4>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header';
    import axios from 'axios';
    import Product from '../components/Product';

    export default {
        name: 'search',
        data() {
            return {
                navBread: [
                    {
                        path: '/',
                        name: '首页'
                    },
                    {
                        path: '/search',
                        name: '搜索'
                    }
                ],
                searchText: '',
                noData: false,
                results: []
            }
        },
        mounted() {
            const searchText = this.$route.params.text;
            this.searchText = searchText;
            if (searchText) {
                axios.get(`/vue-mall-api/products/search?searchText=${searchText}&t=${Date.now()}`).then(res => {
                    if (res.data.code === 200) {
                        if (res.data.data.length > 0) {
                            this.results = [...res.data.data];
                        } else {
                            this.noData = true;
                        }
                    } else {
                        console.log("error: " + res.data.desc);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        components: {Header, Product}
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/_flex.scss';

    .search-title {
        margin-bottom: 15px;
        span {
            color: #c9302c;
        }
    }









</style>