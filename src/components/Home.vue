<template>
    <body>
    <Header></Header>
    <Sidebar class="sidebar"></Sidebar>
    <div class="container" style="overflow: hidden;">
        <router-view></router-view>
    </div>
    <Footer></Footer>
    </body>
</template>
<script>
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import Footer from './layout/Footer'

export default {
    components: {
        Header,
        Sidebar,
        Footer
    }
}
</script>

<style>
body {
    margin: 0;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.sidebar {
    float: left;
}
.container{
    height: 100vh;
}
</style>
