<template>
    <div class="container">
        <!-- 面包屑导航区域 -->
        <div class="crumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 5px">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <div class="table">
            <!-- 搜索与添加区域 -->
            <div class="toolbar">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getMenuList()">
                            <el-button slot="append" icon="el-icon-search" @click="getMenuList()"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="addFormVisible=true">添加菜单</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="userList" :stripe="true" :border="true" v-loading="listLoading" @selection-change="selsChange"
                      :header-cell-style="{background:'#F5F6FA',color:'#666E92'}">
                <el-table-column type="selection" ></el-table-column>
                <el-table-column type="index" ></el-table-column>
                <el-table-column prop="title" label="菜单名"></el-table-column>
                <el-table-column prop="icon" label="图标"></el-table-column>
                <el-table-column prop="index" label="路径"></el-table-column>
                <el-table-column prop="component" label="组件"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDel(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 添加用户的对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addFormVisible"
            width="40%"
            @close="addDialogClosed" >
            <!-- 内容的主体区域 -->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
                <el-form-item label="菜单名" prop="title">
                    <el-col :span="8">
                        <el-input v-model="addForm.title" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-col :span="14">
                        <icon-picker v-model="addForm.icon"></icon-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="路径" prop="index">
                    <el-col :span="14">
                        <el-input v-model="addForm.index"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="组件" prop="component">
                    <el-col :span="14">
                        <el-input v-model="addForm.component"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="addLoading" @click.native="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑"  width="40%" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="菜单名" prop="title">
                    <el-col :span="8">
                        <el-input v-model="editForm.title" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-col :span="14">
                        <icon-picker v-model="editForm.icon"></icon-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="路径" prop="index">
                    <el-col :span="14">
                        <el-input v-model="editForm.index" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="组件" prop="component">
                    <el-col :span="14">
                        <el-input v-model="editForm.component"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    addMenu,
    addUser, batchRemoveMenu,
    batchRemoveUser, editMenu,
    editUser, getMenuListPage,
    getUserListPage, removeMenu,
    removeUser
} from '../../api/api'

export default {
    data () {
        return {
            // 获取用户列表的参数对象
            queryInfo: {
                // 查询参数
                query: '',
                // 当前的页码数
                pagenum: 1,
                // 每页显示多少条数据
                pagesize: 5
            },
            // 获取的用户列表
            userList: [],
            sels: [],//列表选中列
            // 总数
            total: 0,
            //列表加载
            listLoading:false,
            // 控制添加用户对话框的显示与隐藏，默认为隐藏
            addFormVisible: false,
            addLoading:false,
            // 添加用户的表单数据
            addForm: {
                title: '',
                icon:'',
                index:'',
                component: ''
            },
            // 添加表单的验证规则对象
            addFormRules: {
                title: [
                    {required: true, message: '请输入菜单名', trigger: 'blur'}
                ],
                icon: [
                    {required: true, message: '请选择图标', trigger: 'blur'},
                ],
                index: [
                    {required: true, message: '请输入路径', trigger: 'blur'}
                ]
            },
            //编辑
            editLoading: false,
            editFormVisible:false,
            editForm: {
                title: '',
                icon:'',
                index:'',
                component: ''
            },
            editFormRules: {
                title: [
                    {required: true, message: '请输入菜单名', trigger: 'blur'}
                ],
                icon: [
                    {required: true, message: '请选择图标', trigger: 'blur'},
                ],
                index: [
                    {required: true, message: '请输入路径', trigger: 'blur'}
                ]
            },
        }
    },
    created () {
        this.getMenuList()
    },
    methods: {
        async getMenuList () {
            this.listLoading=true
            getMenuListPage(this.queryInfo).then((res) => {
                if(res.code===200) {
                    this.total = res.data.total
                    this.userList = res.data.users
                    this.listLoading = false
                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 监听 pageSize 改变的事件
        handleSizeChange (newSize) {
            //   console.log(newSize)
            //  将监听接受到的每页显示多少条的数据 newSzie 赋值给 pagesize
            this.queryInfo.pagesize = newSize
            //  修改完以后，重新发起请求获取一次数据
            this.getMenuList()
        },
        // 监听 页码值  改变的事件
        handleCurrentChange (newPage) {
            //   console.log(newPage)
            //  将监听接受到的页码值的数据 newPage 赋值给 pagenum
            this.queryInfo.pagenum = newPage
            //  修改完以后，重新发起请求获取一次数据
            this.getMenuList()
        },
        // 监听 switch 开关状态的改变
        async userStateChange (userInfo) {
            console.log(userInfo)
            const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if (res.meta.status !== 200) {
                // 更新失败，将状态返回初始状态
                this.userInfo.mg_state = !this.userInfo.mg_state
                this.$message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功！')
        },
        // 监听添加用户对话框的关闭事件
        addDialogClosed () {
            this.$refs.addFormRef.resetFields()
            this.$refs.editForm.resetFields()
        },
        // 点击按钮，添加新用户
        addUser () {
            this.$refs.addFormRef.validate(async valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true
                        let para = Object.assign({}, this.addForm)
                        addMenu(para).then((res) => {
                            if(res.code==200) {
                                this.addLoading = false
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                                this.addFormVisible = false
                                this.getMenuList()
                            }
                        })
                    })
                }
            })
        },
        //显示编辑
        handleEdit: function (index, row) {
            this.editFormVisible = true
            this.editForm = Object.assign({}, row)
        },
        //编辑提交
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true
                        let para = Object.assign({}, this.editForm)
                        editMenu(para).then((res) => {
                            if(res.code==200) {
                                this.editLoading = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                })
                                this.editFormVisible = false
                                this.getMenuList()
                            }
                        })
                    })
                }
            })
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true
                let para = {id: row.id}
                removeMenu(para).then((res) => {
                    if(res.code==200) {
                        this.listLoading = false
                        //NProgress.done();
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.getMenuList()
                    }
                })
            }).catch(() => {

            })
        },
        //选择多行
        selsChange: function (sels) {
            this.sels = sels
        },
        //批量删除
        batchRemove: function () {
            var ids = this.sels.map(item => item.id).toString()
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true
                let para = {ids: ids}
                batchRemoveMenu(para).then((res) => {
                    if(res.code==200) {
                        this.listLoading = false
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getMenuList()
                    }
                })
            }).catch(() => {

            })
        }
    }
}
</script>

<style scoped>

.container {
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 10px;
    background-color: #FFFFFF;
    height: 100vh;
    border-radius: 5px;
}
.crumb{
    margin-left: 2px;
}
.table{
    margin-top: 20px;
}
.toolbar{
    margin-bottom: 10px;
}
.page{
    margin-top: 10px;
}
</style>
