<template>
    <body>
    <Header></Header>
    <div class="container" style="overflow: hidden;">
        <Sidebar class="sidebar"></Sidebar>
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
</style>
