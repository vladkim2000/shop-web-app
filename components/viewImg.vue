<template>
    <div class="view" :class="{active: this.$store.state.data.viewImg == true}">
        <button class="view__close" @click="closeView"></button>
        <!-- <div class="good-info"> -->
            <img :src="this.$store.state.data.imgSrc" alt="">
            <!-- <p></p> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default{
    methods: {
        closeView(){
            this.$store.commit('data/closeView')
        }
    }
}
</script>

<style>
.view{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.835);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
}
.view.active{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.view img{
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
    width: auto !important;
    height: auto !important;
}

.view__close{
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    z-index: 999;
    right: 30px;
    top: 30px;
    transition: .5s;
}

.view__close::before{
    content: "";
    width: 100%;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    left: 0;
}

.view__close::after{
    content: "";
    width: 100%;
    height: 2px;
    background: white;
    transform: rotate(-45deg);
    position: absolute;
    top: 50%;
    right: 0;
}
</style>