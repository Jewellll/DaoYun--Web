<template>
    <body>
    <Header></Header>
    <Sidebar></Sidebar>
    <router-view></router-view>
    <Footer></Footer>
    </body>
</template>
<script>
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'
export default {
    components:{
        Header,
        Sidebar,
        Footer
    }
}
</script>

<style>
body {
    margin: 0px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}
</style>
