<template>
    <div class="row">
        <div class="col-md-3 card" v-for="item in list" :key="item.index">
            <div class="card-content">
                <div class="card-img" id="tt">
                    <img src="" alt="" class="card-img-top" v-lazy="`static/products/${item.image}`">
                </div>
                <h4 class="card-title">{{item.name}}</h4>
                <p class="card-text">价格：<em>￥</em><span>{{formatPrice(item.price)}}</span></p>
                <p class="card-text">库存: {{item.amount}}</p>
                <button class="btn btn-danger pay-btn" @click="addCart(item._id, item.name,item.price,item.image)">立即购买</button>
            </div>
        </div>
    </div>
</template>

<script>
     import {sortByUp} from '../utils/index'
     
     export default {
         name: "product",
         methods: {
             addCart(id, name, price, image) {
                 let cardList = JSON.parse(localStorage.getItem('cartList'));
                 if (this.$store.state.userInfo.isLogin) {
                     if (cardList && cardList.length > 0) {
                         let newList;
                         for (let i in cardList) {
                             if (id === cardList[i].id) {
                                 newList = [...cardList, ...[{id, name, price, image, checked: cardList[i].checked}]];
                             } else {
                                 newList = [...cardList, ...[{id, name, price, image, checked: true}]]
                             }
                         }
                        //  after sortby array
                        const sortedNewList = sortByUp(newList, 'price');
                        localStorage.setItem('cartList', JSON.stringify(sortedNewList));
                        this.$store.dispatch('updateActionsCart', sortedNewList);
                     } else {
                         let list = [{id, name, price, image, checked: true}];
                         this.$store.dispatch('updateActionsCart', list);
                         localStorage.setItem('cartList', JSON.stringify(list))
                     }
                 } else {
                     this.$router.push({path: '/signIn'})
                 }
             }
         },
         props: ['list']
     }
</script>

<style scoped>
     .card-content {
         padding-bottom: 20px;
     }
</style>