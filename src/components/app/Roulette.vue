<template>
    <div class="m-4">
        <canvas ref="canvas" width="500" height="500"></canvas>
    </div>

    <form class="label">
        <ul>
            <li v-for="(entry, index) in items" :key="index">
                <input class="text-black" v-model="entry.label" type="text" placeholder="項目内容" />
                <input class="text-black" v-model="entry.rate" type="number" placeholder="比率" />
                <button type="button" @click="removeItem(index)" >削除</button>
            </li>
        </ul>
    </form>
    
    <button type="button" @click="addItem" >項目追加</button>
    <button type="button" @click="spin" >Spin</button>
</template>

<script>
export default {
    data() {
        return {
            items: [{ label: '', rate: 1 }]
        };
    },
    methods: {
        addItem() {
            this.items.push({ label: '', rate: 1 });
        },
        removeItem(index) {
            this.items.splice(index, 1);
        },
        spin() {
            console.log('Spin the wheel!');
            // ここにルーレットを回すロジックを追加します。
        }
    },
    mounted() {
        this.setupCanvas();
    },
    methods: {
        setupCanvas() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            // ここでcanvasの初期化を行うなど、描画関連のセットアップを行います。
            ctx.fillStyle = 'red';
            ctx.fillRect(10, 10, 100, 100);
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
input {
    margin: 0.5rem;
}
button {
    margin-left: 1rem;
}
</style>