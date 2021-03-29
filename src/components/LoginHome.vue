<template>
    <body id="poster">
    <div class="title">
        <h1>到云后台管理系统</h1>
    </div>
    <router-view></router-view>
    </body>
</template>

<script>
export default {
    name: 'LoginHome'
}
</script>
<style scoped>
#poster {
    background: url("../assets/img/login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
}
.title {
    margin-top: 15px;
    margin-bottom: 30px;
    font-size: 30px;
    text-align: center;
    text-shadow: 5px 5px 5px black, 0px 0px 2px black;
    color: #5882FA;
}
</style>
