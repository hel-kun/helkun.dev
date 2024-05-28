<template>
    <h1 class="font-bold text-4xl mb-4">へるーれっと(beta版)</h1>
    <p class="mb-4">ルーレットを回してみよう！</p>

    <div class="m-4">
        <canvas ref="canvas" width="500" height="500"></canvas>
    </div>

    <PopupCard ref="popup" />

    <button class="spinButton" type="button" @click="spin" :disabled="isSpinning" >ルーレットを回す</button>

    <div class="tableTitle">
        <p>抽選項目</p>
        <p>当選比率</p>
    </div>
    <form class="label">
        <ul>
            <li v-for="(entry, index) in items" :key="index">
                <input class="text-black" v-model="entry.label" @blur="contentEvent" type="text" placeholder="項目内容" :disabled="isSpinning" />
                <input class="text-black" v-model.number="entry.rate" @blur="rateEvent(index) " type="number" placeholder="比率" :disabled="isSpinning" />
                <button class="deleteButton" type="button" @click="removeItem(index)" :disabled="isSpinning" >削除</button>
            </li>
        </ul>
    </form>
    
    <div class="flex justify-between">
        <button class="addButton" type="button" @click="addItem" :disabled="isSpinning" >項目追加</button>
        <button class="scrollButton" type="button" @click="moveToTop">
            <div class="flex flex-col justify-center items-center px-2">
                <span class="bar1"></span>
                <span class="bar2"></span>
            </div>
            <p>トップへ</p>
            <div class="flex flex-col justify-center items-center px-2">
                <span class="bar1"></span>
                <span class="bar2"></span>
            </div>
        </button>
    </div>
</template>

<script>
import PopupCard from '@/components/app/Roulette/PopupCard.vue';
export default {
    components: {
        PopupCard
    },
    data() {
        return {
            items: [{ label: '', rate: 1 }],
            currentRotation: 0,
            spinDuration: 3000,
            isSpinning: false,
        };
    },
    mounted() {
        this.drawCanvas();
    },
    methods: {
        addItem() {
            console.log('Add item!');
            this.items.push({ label: '', rate: 1 });
            this.drawCanvas();
        },
        contentEvent() {
            this.drawCanvas();
        },
        rateEvent(index) {
            //rateが数字じゃないもしくは負の時の処理
            if(typeof this.items[index].rate != 'number' || this.items[index].rate<0 ){
                this.items[index].rate=1;
            }
            // 全てのrateが0の時の処理
            let totalRate = this.items.reduce((sum, item) => sum + item.rate, 0);
            if(totalRate === 0){
                this.items[index].rate=1;
            }
            this.drawCanvas();
        },
        removeItem(index) {
            if(this.items.length === 1){
                window.alert('最後の項目は削除できません。');
            }else{
                console.log('Remove item!');
                this.items.splice(index, 1);
                this.drawCanvas();
            }
        },
        moveToTop(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        spin() {
            this.isSpinning = true;

            const spinToAngle = 3600 + Math.random() * 360;
            const startTime = Date.now();
            const duration = this.spinDuration;

            const animate = () => {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < duration) {
                    const easeOut = 1 - ((1 - elapsedTime / duration) ** 3); //少しずつ遅くする
                    this.currentRotation = easeOut * spinToAngle; //easeOutをかけることで遅くなる
                    this.drawCanvas(this.currentRotation); //canvasを描画
                    requestAnimationFrame(animate);
                } else {
                    this.currentRotation = spinToAngle; //最終的な角度に設定
                    this.drawCanvas(this.currentRotation); //canvasを描画
                    this.selectItem(this.currentRotation % 360); //選ばれた項目を表示
                    this.isSpinning = false;
                }
            };

            requestAnimationFrame(animate);
        },
        selectItem(finalAngle) {
            console.log(finalAngle);

            let totalRate = this.items.reduce((sum, item) => sum + item.rate, 0);
            let startAngle = -finalAngle;
            let pointAngle = 0;

            for (let item of this.items) {
                let sliceAngle = (item.rate / totalRate) * 360;
                if (startAngle < pointAngle && pointAngle <= startAngle + sliceAngle) {
                    this.$refs.popup.show(item.label);
                    break;
                }
                startAngle += sliceAngle;
            }
        },
        drawCanvas(rotation = 0) {
            let canvas = this.$refs.canvas;
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;
            let radius = Math.min(centerX, centerY) - 30;
            let totalRate = this.items.reduce((sum, item) => sum + item.rate, 0);
            let startAngle = -rotation * Math.PI / 180;

            this.items.forEach((item, index) => {
                if(item.rate === 0) return;

                let sliceAngle = (item.rate / totalRate) * Math.PI * 2;
                let color = `hsla(${360 * (index / this.items.length)}, 100%, 50%, 75%)`;
            
                //円弧
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                ctx.closePath();
                ctx.fill();

                // ラベル
                ctx.font = totalRate > 12 ? "18px Arial" : "28px Arial";
                ctx.textAlign = "center";
                let textAngle = startAngle + sliceAngle / 2;
                let textX = centerX + (radius / 2) * Math.cos(textAngle);
                let textY = centerY + (radius / 2) * Math.sin(textAngle);
                ctx.save();
                ctx.translate(textX, textY);
                ctx.rotate(textAngle);
                ctx.fillStyle = "#fff";
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 6;
                ctx.strokeText(item.label, 0, 0, canvas.width /2 - 40);
                ctx.fillText(item.label, 0, 0, canvas.width /2 - 40);
                ctx.restore();
            
                startAngle += sliceAngle;
            });

            // 三角矢印
            ctx.beginPath();
            ctx.moveTo(centerX + radius + 10, centerY - 15);
            ctx.lineTo(centerX + radius + 10, centerY + 15);
            ctx.lineTo(centerX + radius - 25, centerY);
            ctx.closePath();
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = "#ff0055";
            ctx.fill();
        }
    },
}
</script>

<style scoped>
canvas{
    @apply mx-auto w-full max-w-[500px];
}
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
    @apply bg-blue-500 text-white block mx-auto my-4 p-2 rounded-md hover:bg-blue-700;
}
.addButton {
    @apply bg-green-500 text-white m-2 p-2 rounded-md hover:bg-green-700 order-first;
}
.scrollButton{
    @apply bg-yellow-500 text-white m-2 p-2 rounded-md hover:bg-yellow-700 order-last flex justify-center items-center px-2;
    .bar1{
        @apply w-3 h-1 rounded-full bg-white -rotate-45 -translate-x-1 translate-y-[2px];
    }
    .bar2{
        @apply w-3 h-1 rounded-full bg-white rotate-45 translate-x-1 -translate-y-[2px];
    }
}
</style>