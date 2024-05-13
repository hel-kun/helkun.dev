<template>
    <h1 class="font-bold text-4xl mb-4">Webルーレット(beta版)</h1>
    <p class="mb-4">ルーレットを回してみよう！</p>
<!--
    <div class="m-4">
        <canvas ref="canvas" width="500" height="500"></canvas>
    </div>
-->
    <PopupCard ref="popup" />

    <div class="tableTitle">
        <p>抽選項目</p>
        <p>当選比率</p>
    </div>
    <form class="label">
        <ul>
            <li v-for="(entry, index) in items" :key="index">
                <input class="text-black" v-model="entry.label" type="text" placeholder="項目内容" />
                <input class="text-black" v-model.number="entry.rate" type="number" placeholder="比率" />
                <button class="deleteButton" type="button" @click="removeItem(index)" >削除</button>
            </li>
        </ul>
    </form>
    
    <button class="addButton" type="button" @click="addItem" >項目追加</button>
    <button class="spinButton" type="button" @click="spin" >抽選を回す</button>
</template>

<script>
import PopupCard from '@/components/app/Roulette/PopupCard.vue';
import { number } from 'astro/zod';
export default {
    components: {
        PopupCard
    },
    data() {
        return {
            items: [{ label: '', rate: 1 }]
        };
    },
    //mounted() {
    //    this.setupCanvas();
    //},
    methods: {
        addItem() {
            console.log('Add item!');
            this.items.push({ label: '', rate: 1 });
        },
        removeItem(index) {
            if(this.items.length === 1){
                window.alert('最後の項目は削除できません。');
            }else{
                console.log('Remove item!');
                this.items.splice(index, 1);
            }
        },
        spin() {
            console.log('Spin the wheel!');
            let totalRate=0;
            for (let item of this.items) {
                if(typeof item.rate != 'number' && item.rate < 0){
                    window.alert('当選比率は0以上の数値で入力してください。');
                    return;
                }
                totalRate += item.rate;
            }
            if(totalRate === 0){
                window.alert('当選比率が全て0なので抽選できません。');
                return;
            }
            let random = Math.random() * totalRate;
            let sum = 0;

            for (let item of this.items) {
                sum += item.rate;
                if (random < sum) {
                    console.log('Selected:', item.label);
                    this.$refs.popup.show(item.label);
                    break;
                }
            }
        },
        //setupCanvas() {
        //    const canvas = this.$refs.canvas;
        //    const ctx = canvas.getContext('2d');
        //    ctx.fillStyle = 'rgb(255, 0, 0)';
        //    ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
        //    ctx.fill();
        //}
    },
}
</script>

<style scoped>
.tableTitle{
    @apply flex flex-nowrap;
    p{
        @apply font-bold text-center mx-1 px-1 w-[37.5%] max-w-52;
    }
}
ul {
    @apply list-none p-0;
    li{
        @apply flex flex-nowrap h-12 m-2;
        input {
            @apply m-1 p-1 w-[37.5%] max-w-52 rounded-md border border-gray-300;
        }
        .deleteButton {
            @apply bg-red-500 text-white m-1 p-2 rounded-md hover:bg-red-700;
        }
    }
}
.spinButton {
    @apply bg-blue-500 text-white m-2 p-2 rounded-md hover:bg-blue-700;
}
.addButton {
    @apply bg-green-500 text-white m-2 p-2 rounded-md hover:bg-green-700;
}
</style>