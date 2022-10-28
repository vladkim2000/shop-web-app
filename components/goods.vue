<template>
    <div class="container goods-content">
        <div class="categories-content">
            <h2>Categories</h2>
            <div class="categories" ref="categories">
            <button class="category" 
            v-for="(category, index) in this.$store.state.data.categories" 
            :key="index"
            @click="selectCategory(index)">
              {{category}}
            </button>
            </div>
        </div>
        <div class="goods-categories" ref="goodsCategories">
            <div class="goods-category active">
               <div class="good" 
               v-for="good in this.$store.state.data.mensClothes" 
               :id="good.id">
                 <div class="good-img" >
                    <img :src="good.image" alt="" @click="showImg">
                    <!-- <p class="description">{{good.description}}</p> -->
                 </div>
                 <div class="good-description">
                    <p>{{good.title}}</p>
                    <h5>{{good.price}}</h5>
                    <div class="good-btns">
                        <!-- <button class="look-btn">View product</button> -->
                        <button class="order-btn" @click="addToCart">Add to cart</button>
                        <button class="order-btn" @click="addToCart">Substract from cart</button>
                    </div>
                 </div>  
                 <p class="amount">{{ getGoodAmount }}</p>  
               </div> 
            </div>
            <div class="goods-category ">
                <div 
                class="good" 
                v-for="good in this.$store.state.data.jeweleries"
                :id="good.id">
                    <div class="good-img">
                    <img :src="good.image" alt="" @click="showImg">
                 </div>
                 <div class="good-description">
                    <p>{{good.title}}</p>
                    <h5>{{good.price}}</h5>
                    <div class="good-btns">
                        <!-- <button class="look-btn">View product</button> -->
                        <button class="order-btn" @click="addToCart">Add to cart</button>
                        <button class="order-btn" @click="addToCart">Substract from cart</button>
                    </div>
                 </div>
                 <p class="amount">{{ getGoodAmount }}</p>  
                </div> 
            </div>
            <div class="goods-category ">
                <div 
                class="good" 
                v-for="good in this.$store.state.data.electronics"
                :id="good.id"
                >
                    <div class="good-img">
                    <img :src="good.image" alt="" @click="showImg">
                 </div>
                 <div class="good-description">
                    <p>{{good.title}}</p>
                    <h5>{{good.price}}</h5>
                    <div class="good-btns">
                        <!-- <button class="look-btn">View product</button> -->
                        <button class="order-btn" @click="addToCart">Add to cart</button>
                        <button class="order-btn" @click="addToCart">Substract from cart</button>
                    </div>
                 </div>
                 <p class="amount">{{ getGoodAmount }}</p>  
                </div> 
            </div>
            <div class="goods-category ">
                <div 
                class="good" 
                v-for="good in this.$store.state.data.womensClothes"
                :id="good.id"
                >
                    <div class="good-img">
                    <img :src="good.image" alt="" @click="showImg">
                 </div>
                 <div class="good-description">
                    <p>{{good.title}}</p>
                    <h5>{{good.price}}</h5>
                    <div class="good-btns">
                        <!-- <button class="look-btn">View product</button> -->
                        <button class="order-btn" @click="addToCart">Add to cart</button>
                        <button class="order-btn" @click="addToCart">Substract from cart</button>
                    </div>
                 </div>  
                 <p class="amount">{{ getGoodAmount }}</p>  
                </div> 
            </div>
        </div>
    </div>
</template>

<script >

// import {mounted} from 'vue'

export default {
    data(){
        return {
            allGoods: {}
        }
    },
    computed: {
      getAmount(){
        return this.$store.getters.getAmount
      }
    },
    created(){
        this.$store.state.data.mensClothes.forEach(mensCloth => {
            mensCloth.amount = 0
            if(!mensCloth.hasOwnProperty("totalSum")){
                Object.defineProperty(mensCloth, 'totalSum', {
                get(){
                    return this.price * this.amount;
                }
            })
            }
        }) 
        this.$store.state.data.womensClothes.forEach(womensCloth => {
            womensCloth.amount = 0
            if(!womensCloth.hasOwnProperty("totalSum")){
                Object.defineProperty(womensCloth, 'totalSum', {
                get(){
                    return this.price * this.amount;
                }
              })
            }
        }) 
        this.$store.state.data.electronics.forEach(electronic => {
            electronic.amount = 0
            if(!electronic.hasOwnProperty("totalSum")){
                Object.defineProperty(electronic, 'totalSum', {
                get(){
                    return this.price * this.amount;
                }
            })
            }
        }) 
        this.$store.state.data.jeweleries.forEach(jewelery => {
            jewelery.amount = 0
            if(!jewelery.hasOwnProperty("totalSum")){
                Object.defineProperty(jewelery, 'totalSum', {
                get(){
                    return this.price * this.amount;
                }
            })
            }
        })
        const objMensClothes = Object.fromEntries(
        // this.$store.state.data.mensClothes.map(menCloth => [menCloth.id, {menCloth}])
        this.$store.state.data.mensClothes.map(menCloth => [menCloth.id, menCloth] )
        )
        const objJeweleries = Object.fromEntries(
        // this.$store.state.data.jeweleries.map(jewelery => [jewelery.id, {jewelery}])
        this.$store.state.data.jeweleries.map(jewelery => [jewelery.id, jewelery])
        )
        const objWomensClothes = Object.fromEntries(
        // this.$store.state.data.womensClothes.map(womenCloth => [womenCloth.id, {womenCloth}])
        this.$store.state.data.womensClothes.map(womenCloth => [womenCloth.id, womenCloth])
        )
        const objElectronics = Object.fromEntries(
        // this.$store.state.data.electronics.map(electronic => [electronic.id, {electronic}])
        this.$store.state.data.electronics.map(electronic => [electronic.id, electronic])
        )
        
        this.allGoods = Object.assign(objMensClothes, objJeweleries, objWomensClothes, objElectronics)
        this.$store.commit('data/allGoods', this.allGoods)    
    },
    computed: {
       getGoodAmount(){
        return this.$store.getters.getGoodAmount
       }
    },
    data: () => ({
      amount: 0,
      viewGood: false
    }),
    methods: {
       selectCategory(index){
        const goodsCategories = document.querySelectorAll('.goods-category');
        for(let j = 0; j < goodsCategories.length; j++){
            if(j == index){
                goodsCategories[j].classList.add('active')
            }else{
                goodsCategories[j].classList.remove('active')
            }
        }
       },
      addToCart(event){
        this.$store.dispatch('data/plusOrMinus', event.target)
        },
        showImg(event){
            this.viewGood = true
            let imgSrc = event.currentTarget.src
            let id = event.currentTarget.closest('.good').id;
            console.log(id);
            // console.log(imgSrc);
           this.$store.commit('data/showImage', imgSrc, id)
        }
      },
    async fetch() {
     this.goods = await this.$http.$get('https://fakestoreapi.com/products')
    for(let i = 0; i < this.goods.length; i++){

        this.$store.state.data.categories.push(this.goods[i].category)
        switch(this.goods[i].category){
            case "men's clothing":
                this.$store.state.data.mensClothes.push(this.goods[i])
                break;
            case "jewelery":
                this.$store.state.data.jeweleries.push(this.goods[i])
                break;
            case "electronics":
                this.$store.state.data.electronics.push(this.goods[i])
                break;
            default: 
            this.$store.state.data.womensClothes.push(this.goods[i])
        }
    }
    console.log(this.goods);
    this.$store.state.data.categories = new Set(this.$store.state.data.categories);
  },
}

</script>

<style>
@import './css/style.css';

.description{
    /* display: none; */
    visibility: hidden;
}

.categories-content{
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    padding: 25px 25px 70px;
    margin-top: 35px;
    height: max-content;
    width: 25%;
    text-align: center;
}

.categories-content h2{
    font-weight: 700;
font-size: 24px;
line-height: 29px;
color: var(--gray-text);
margin-bottom: 25px;
}

.categories{
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.category {
    font-weight: 400;
font-size: 14px;
line-height: 17px;
color: var(--gray-text);
text-transform: capitalize;
}

.category:hover{
   font-weight: 700;
}


.goods-content{
    display: flex;
    gap: 22px;
    
}
.goods-categories{
    margin-top: 35px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    /* gap: 30px; */
}

.goods-category{
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
    display: none;
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    padding: 25px ;
}

.goods-category.active{
    display: flex;
    transition: 0.5s;
}

.good{
    position: relative;
    width: 45%;
    border-radius: 20px;
    border: 1px solid var(--border-colour);
    /* padding: 15px; */
}



.good .amount{
    display: none;
}

.good .amount.active{
    display: flex;
    position: absolute;
    top: -5px;
    left: -10px;
    padding: 5px 10px;
    background: var(--blue-bg);
    color: #FFFFFF;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    border-radius: 50%;
}

.good-img{
    padding: 15px;
    position: relative;
    /* background: linear-gradient(to top, rgba(0, 0, 0, 0.637), transparent); */
    
    /* max-height: 340px; */
}

/* .good-img:hover{
    background: transparent;
    transition: .5s;
} */

.good img{
    width: 100%;
    height: 340px;
    object-fit: contain;
    /* margin: 15px; */
}



.good-description{
    border-radius: 0 0 20px 20px;
    /* border: 1px solid var(--border-colour); */
    border-top: 1px solid var(--border-colour);
    padding:15px 15px 20px;
}

.good-description p{
    font-weight: 400;
font-size: 14px;
line-height: 17px;
color: var(--gray-text);
margin-bottom: 5px;
}

.good-description h5{
    font-weight: 700;
font-size: 18px;
line-height: 22px;
color: var(--gray-text);
}

.good-btns{
    margin-top: 30px;
    display: flex;
    gap: 10px;
}

.look-btn{
    color: var(--gray-btn);
    padding: 10px 15px;
    border-radius: 8px;
    border: 1.5px solid var(--border-colour);
    font-weight: 700;
font-size: 14px;
line-height: 17px;
}

.order-btn{
    border-radius: 8px;
    padding: 10px 15px;
    background: var(--blue-bg);
    font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
}

.good-img:hover{
  cursor: pointer;
}

</style>