<template>
    <div class="pagination-box">
        <ul class="pagination pagination-lg">
            <li :class="{disabled:1===pageNo ? true:false}">
                <a href="javascript:void(0)" @click="prev">&laquo;</a>
            </li>
            <li v-for="i in pageSum" :key="i" :class="{active:i===pageNo ? true:false}">
                <a href="javascript:void(0)" @click="toPage(i)">{{i}}</a>
            </li>
            <li :class="{disabled:pageSum===pageNo ? true:false}">
                <a href="javascript:void(0)">&raquo;</a>
            </li>
        </ul>
    </div>
</template>