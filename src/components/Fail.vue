<template>
    <div class="container pt">
        <img :src="fail" class="status_ok" alt="">
        <div class="msg">{{msg}}, {{number}}秒后返回</div>
    </div>
</template>

<script>
    export default {
        name: 'fail',
        data() {
            return {
                msg: '',
                fail: require('../../static/svg/fail.svg'),
                number: 3
            }
        },
        mounted() {
            this.msg = this.$route.params.msg;
            let timer = setInterval(() => {
                this.number--;
                if (this.number === 0) {
                    clearInterval(timer);
                    this.$route.params.url ? this.$$route.push(this.$route.params.url) : this.$route.go(-1);
                }
            }, 1000);
        }
    }
</script>

<style scoped>
    .status_ok {
        width: 120px;
        margin: 0 auto;
        display: block;
    }
    .msg {
        text-align: center;
        padding: 15px 0;
        color: #e02f2f;
        font-size: 18px;
    }
    .pt {
        padding-top: 200px;
    }
</style>