<template>
    <div class="container pt">
        <img :src="success" class="status_ok" alt="">
        <div class="msg">{{msg}}, {{number}}秒后返回</div>
    </div>
</template>

<script>
    export default {
        name: 'Success',
        data() {
            return {
                msg: '操作成功',
                success: require('../../static/svg/success.svg'),
                number: 3,
            }
        },
        mounted() {
            this.msg = this.$route.params.msg;
            let timer = setInterval(() => {
                this.number--;
                if (this.number === 0) {
                    clearInterval(timer);
                    this.$route.params.url ? this.$route.push(this.$route.params.url) : this.$route.go(-1);
                }
            }, 1000)
        }
    }
</script>