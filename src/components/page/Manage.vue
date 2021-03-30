<template>
<div class="manage-container">
    <div class="container">
        <div class="title">
            <h1>欢迎来到到云</h1>
        </div>
    <div class="info">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                label="成员"
                width="180">
            </el-table-column>
            <el-table-column
                prop="id"
                label="学号"
                width="180">
            </el-table-column>
        </el-table>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Manage',
    data() {
        return {
            tableData: [{
                name: '朱文龙',
                id: '200327128'
            }, {
                name: '陈黎',
                id: '200327011'
            }, {
                name: '杨礼亮',
                id: '200327104'
            }, {
                name: '魏凌',
                id: '200327176'
            }]
        }
    }
}
</script>

<style scoped>
.title{
    padding-top: 10px;
    text-align: center;
}
.info{
    margin-left: 500px;
}
.container{
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #FFFFFF;
    height:500px;
    border-radius: 5px;
}
</style>
