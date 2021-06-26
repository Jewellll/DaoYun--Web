<template>
    <div class="container">
        <!-- 面包屑导航区域 -->
        <div class="crumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 5px">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>课程管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 卡片视图区域 -->
        <div class="table">
            <!-- 搜索与添加区域 -->
            <div class="toolbar">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="addFormVisible=true">添加课程</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="userList" :stripe="true" :border="true" v-loading="listLoading" @selection-change="selsChange"
                      :header-cell-style="{background:'#F5F6FA',color:'#666E92'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="课程名"></el-table-column>
                <el-table-column prop="college" label="学院"></el-table-column>
                <el-table-column prop="schoolname" label="学校"></el-table-column>
                <el-table-column prop="teacherName" label="授课教师" ></el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="能否加入课程" :formatter="formatState"></el-table-column>
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
            title="添加课程"
            :visible.sync="addFormVisible"
            width="40%"
            @close="addDialogClosed" >
            <!-- 内容的主体区域 -->
            <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
                <el-form-item label="课程名" prop="name">
                    <el-col :span="8">
                        <el-input v-model="addForm.name" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学院" prop="college">
                    <el-col :span="8">
                        <el-input v-model="addForm.college"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学校" prop="schoolname">
                    <el-col :span="8">
                        <el-input v-model="addForm.schoolname"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="授课教师" prop="teacherName">
                    <el-col :span="8">
                        <el-input v-model="addForm.teacherName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="能否加入课程">
                    <el-col :span="14">
                        <el-radio-group v-model="addForm.state">
                            <el-radio class="radio" label="0">能</el-radio>
                            <el-radio class="radio" label="1">否</el-radio>
                            <el-radio class="radio" label="2">未知</el-radio>
                        </el-radio-group>
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
                <el-form-item label="课程名" prop="name">
                    <el-col :span="8">
                        <el-input v-model="editForm.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学院" prop="college">
                    <el-col :span="8">
                        <el-input v-model="editForm.college"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="学校" prop="schoolname">
                    <el-col :span="8">
                        <el-input v-model="editForm.schoolname"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="授课教师" prop="teacherName">
                    <el-col :span="8">
                        <el-input v-model="editForm.teacherName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="能否加入课程">
                    <el-col :span="14">
                        <el-radio-group v-model="editForm.state">
                            <el-radio class="radio" label="0">能</el-radio>
                            <el-radio class="radio" label="1">否</el-radio>
                            <el-radio class="radio" label="2">未知</el-radio>
                        </el-radio-group>
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
    addCourse,
    addTeacher, batchRemoveCourse,
    batchRemoveTeacher, editCourse,
    editTeacher, getCourseListPage,
    getTeacherListPage, removeCourse,
    removeTeacher
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
                name: '',
                college:'',
                schoolname: '',
                teacherName: '',
                state:'2'
            },
            // 添加表单的验证规则对象
            addFormRules: {
                name: [
                    {required: true, message: '请输入课程名', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                college: [
                    {required: true, message: '请输入学院', trigger: 'blur'},
                ],
                schoolname: [
                    {required: true, message: '请输入学校', trigger: 'blur'},
                ],
                teacherName: [
                    {required: true, message: '请输入教师姓名', trigger: 'blur'},
                ]

            },
            //编辑
            editLoading: false,
            editFormVisible:false,
            editForm: {
                name: '',
                college:'',
                schoolname: '',
                teacherName: '',
                state:'2'
            },
            editFormRules: {
                name: [
                    {required: true, message: '请输入课程名', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                college: [
                    {required: true, message: '请输入学院', trigger: 'blur'},
                ],
                schoolname: [
                    {required: true, message: '请输入学校', trigger: 'blur'},
                ],
                teacherName: [
                    {required: true, message: '请输入教师姓名', trigger: 'blur'},
                ]
            },
        }
    },
    created () {
        this.getUserList()
    },
    methods: {
        //性别显示转换
        formatState: function (row, column) {
            return row.sex === 0 ? '能' : row.sex === 1 ? '否' : '未知'
        },
        async getUserList () {
            // this.listLoading=true
            this.userList=[{name:'asds'}]
            getCourseListPage(this.queryInfo).then((res) => {
                if(res.code===200) {
                    this.$message.success(res.msg)
                    console.log(res)
                    this.total = res.data.total
                    // this.userList = res.data
                    this.listLoading = false
                }
            })
        },
        // 监听 pageSize 改变的事件
        handleSizeChange (newSize) {
            //   console.log(newSize)
            //  将监听接受到的每页显示多少条的数据 newSzie 赋值给 pagesize
            this.queryInfo.pagesize = newSize
            //  修改完以后，重新发起请求获取一次数据
            this.getUserList()
        },
        // 监听 页码值  改变的事件
        handleCurrentChange (newPage) {
            //   console.log(newPage)
            //  将监听接受到的页码值的数据 newPage 赋值给 pagenum
            this.queryInfo.pagenum = newPage
            //  修改完以后，重新发起请求获取一次数据
            this.getUserList()
        },
        // 监听 switch 开关状态的改变
        async userStateChange (userInfo) {
            console.log(userInfo)
            var param={id:userInfo.id,state:userInfo.state}
            const {data: res} = await this.$http.post(`/users/state/`,param)
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
                        addCourse(para).then((res) => {
                            if(res.code==200) {
                                this.addLoading = false
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                                this.addFormVisible = false
                                this.getUserList()
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
                        editCourse(para).then((res) => {
                            if(res.code==200) {
                                this.editLoading = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                })
                                this.editFormVisible = false
                                this.getUserList()
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
                removeCourse(para).then((res) => {
                    if(res.code==200) {
                        this.listLoading = false
                        //NProgress.done();
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.getUserList()
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
                batchRemoveCourse(para).then((res) => {
                    if(res.code==200) {
                        this.listLoading = false
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getUserList()
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
