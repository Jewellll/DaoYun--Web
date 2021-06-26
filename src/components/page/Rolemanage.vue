<template>
    <div class="container">
        <div class="crumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 5px">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px;display: flex;margin-bottom: 20px">
            <div style="margin-left: 20px">
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
<!--                    <el-select v-model="select" slot="prepend" placeholder="请选择">-->
<!--                        <el-option label="学号" value="1"></el-option>-->
<!--                        <el-option label="姓名" value="2"></el-option>-->
<!--                        <el-option label="用户电话" value="3"></el-option>-->
<!--                    </el-select>-->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="buttons">
                <el-button @click="toggleSelection()" type="warning">取消选择</el-button>
            </div>
            <div class="buttons">
                    <el-button slot="reference" @click="deleteSelected()" type="danger" :disabled="this.multipleSelection.length===0">批量删除</el-button>
            </div>
            <div class="buttons">
                <el-button @click="dialogFormVisibleForAdd = true" type="primary">添加角色</el-button>
            </div>

        </div>
        <el-row :gutter="15">
            <!--角色管理-->
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span class="role-span">角色列表</span>
                    </div>
                    <el-table
                        ref="multipleTable"
                        highlight-current-row
                        @current-change="getRoleMenu"
                        style="width: 100%;"
                        :data="TableData"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="ID" />
                        <el-table-column prop="name" label="名称" />
                        <el-table-column prop="loginType" label="类型值" />
                        <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述" />
                        <el-table-column label="操作" width="200px" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    class="op-button"
                                    icon="el-icon-edit"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                                    <el-button
                                        class="op-button"
                                        size="mini"
                                        icon="el-icon-delete"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)"></el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页组件-->
                    <div class="block">
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
<!--                    <div class="block">-->
<!--                        <el-pagination-->
<!--                            @size-change="handleSizeChange"-->
<!--                            @current-change="handleCurrentChange"-->
<!--                            :current-page.sync="currentPage"-->
<!--                            :page-size="pageSize"-->
<!--                            layout="prev, pager, next, jumper"-->
<!--                            :total="TableData.length">-->
<!--                        </el-pagination>-->
<!--                    </div>-->
                </el-card>
            </el-col>
            <!-- 菜单授权 -->
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                        </el-tooltip>
                        <el-button
                            :disabled="!showButton"
                            :loading="menuLoading"
                            icon="el-icon-check"
                            size="mini"
                            style="float: right; padding: 6px 9px"
                            type="primary"
                            @click="saveMenu"
                        >保存</el-button>
                    </div>
                    <el-tree
                        :data="menus"
                        ref="menuTree"
                        show-checkbox
                        check-strictly
                        highlight-current
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="AssignedMenu"
                        :props="defaultProps">
                    </el-tree>
                </el-card>
            </el-col>
        </el-row>
        <!-- 编辑角色-->
        <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleForEdit" width="700px">
            <el-form :model="RoleForm" :rules="rules">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="RoleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型值" :label-width="formLabelWidth">
                    <el-input v-model="RoleForm.loginType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="RoleForm.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleForEdit = false">取 消</el-button>
                <el-button type="primary" @click="editRole()">确 定</el-button>
            </div>
        </el-dialog>
        <!--    添加角色-->
        <el-dialog title="添加角色" :visible.sync="dialogFormVisibleForAdd" width="700px">
            <el-form :model="RoleForm">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="RoleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型值" :label-width="formLabelWidth">
                    <el-input v-model="RoleForm.loginType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        v-model="RoleForm.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleForAdd = false">取 消</el-button>
                <el-button type="primary" @click="addRole()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {
    getUserListPage,
    getAllMenus,
    getRole,
    requestMenu,
    distributeMenu,
    removeUser,
    requestMenuByRoleId, requestEditRole, requestAddRole, requestRemoveRole
} from '../../api/api'

export default {
    name: "RoleManage",
    data() {
        return {
            queryInfo: {
                // 查询参数
                query: '',
                // 当前的页码数
                pagenum: 1,
                // 每页显示多少条数据
                pagesize: 5
            },
            total:'',
            multipleSelection: [],
            AssignedMenu: [],
            currentRoleId: 0,
            dialogFormVisibleForEdit: false,
            dialogFormVisibleForAdd: false,
            query: '',
            select: '',

            formLabelWidth: '120px',
            dateScopes: [
                '全部',
                '本级',
                '自定义'
            ],
            RoleForm: {
                id: 1,
                name: '',
                remark: '-',
                loginType:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            TableData: [],
            menus: [],
            currentId: 0, menuLoading: false, showButton: true,
            defaultProps: { children: 'children', label: 'title', isLeaf: 'leaf' },
            menuIds: [], depts: [], deptDatas: [], // 多选时使用
        }
    },
    methods: {
        getAllRole: function () {
            this.TableData= [{name:'sdsd'}]
            getRole(this.queryInfo).then((res) => {
                if(res.code===200) {
                    this.total = res.data.total
                    // this.TableData= res.data.users

                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        getMenu: function () {
            getAllMenus().then(res => {
                this.menus = res.data.data
            })
        },
        formatType: function (row, column) {
            return row.loginType === 1 ? '教师' : row.loginType === 2 ? '学生' :row.loginType === 0 ? '管理员': '未知'
        },
        getRoleMenu(val) {
            this.loading = true
            this.AssignedMenu = []
            this.currentRoleId = val.id
            var param ={id:val.id}
            requestMenuByRoleId(param).then(res => {
                let menus = res.data
                for (let i = 0;i < menus.length;i++) {
                    this.AssignedMenu.push(menus[i].id)
                    for(let j = 0;j < menus[i].subs.length;j++){
                        this.AssignedMenu.push(menus[i].subs[j].id)
                    }
                }
                this.$refs.menuTree.setCheckedKeys([])
                this.$refs.menuTree.setCheckedKeys(this.AssignedMenu)
                this.loading = false
            })
        },
        saveMenu() {
            let selectedMenu = this.$refs.menuTree.getHalfCheckedKeys().concat(this.$refs.menuTree.getCheckedKeys())
            console.log('当前菜单',selectedMenu)
            console.log('当前角色',this.currentRoleId)
            const param = { menuId:selectedMenu,id:this.currentRoleId}
            // 提交菜单分配
            distributeMenu(param).then((res) => {
                if(res.code===200) {
                    this.$message.success(res.msg)
                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        deleteSelected(){

        },
        // 显示编辑
        handleEdit: function (index, row) {
            this.dialogFormVisibleForEdit = true
            this.RoleForm = Object.assign({}, row)
        },
        addRole() {
            const param = this.RoleForm
            requestAddRole(param).then((res) => {
                if(res.code===200) {
                    this.$message.success(res.msg)
                    this.getAllRole()
                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        editRole() {
            const param = this.RoleForm
            requestEditRole(param).then((res) => {
                if(res.code===200) {
                    this.$message.success(res.msg)
                    this.getAllRole()
                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // handleEdit: function (index, row){
        //     this.dialogFormVisible = true
        //     this.RoleForm.name = row.name
        // },
        handleDelete: function (index, row){
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = {id: row.id}
                requestRemoveRole(para).then((res) => {
                    if(res.code===200) {
                        this.$message.success(res.msg)
                        this.getAllRole()
                    }
                })
            }).catch(() => {

            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 监听 pageSize 改变的事件
        handleSizeChange (newSize) {
            //   console.log(newSize)
            //  将监听接受到的每页显示多少条的数据 newSzie 赋值给 pagesize
            this.queryInfo.pagesize = newSize
            //  修改完以后，重新发起请求获取一次数据
            this.getAllRole()
        },
        // 监听 页码值  改变的事件
        handleCurrentChange (newPage) {
            //   console.log(newPage)
            //  将监听接受到的页码值的数据 newPage 赋值给 pagenum
            this.queryInfo.pagenum = newPage
            //  修改完以后，重新发起请求获取一次数据
            this.getAllRole()
        },
    },
    mounted() {
    },
    created() {
        this.getAllRole()
        this.getMenu()
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
.buttons {
    margin-left: 20px;
}
.block {
    float: right;
    margin-top: 30px;
    margin-right: 30px;
    margin-bottom: 30px;
}
.op-button {
    margin-left: 5px;
}
</style>
