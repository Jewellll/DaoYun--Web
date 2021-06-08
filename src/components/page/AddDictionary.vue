    <template>
        <div class="container">

            <!-- 面包屑导航区域 -->
            <div class="add">
                <div style="text-align: left;margin-left: 5px">
                数据字典
                </div>
                <hr>
                <el-form :model="dicForm" label-width="80px" :rules="dicFormRules" ref="editForm">
                    <el-form-item label="中文标识" prop="typename">
                        <el-col :span="8">
                            <el-input v-model="dicForm.typename"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="英文标识" prop="code">
                        <el-col :span="8">
                            <el-input v-model="dicForm.code"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>

            <div class="table">
                <div style="text-align: left;margin-top: 10px;margin-left: 5px">
                    数据项
                </div>
                <hr>
                <el-table :data="dicList" :stripe="true" :border="true" v-loading="listLoading" :header-cell-style="{background:'#F5F6FA',color:'#666E92'}">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="value" label="数据数值"></el-table-column>
                    <el-table-column prop="name" label="数值名称" ></el-table-column>
                    <el-table-column prop="isDefault" label="默认值" ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- 修改按钮 -->
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                            <!-- 删除按钮 -->
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDel(scope.$index, scope.row)"></el-button>

                            <el-button type="primary" icon="el-icon-caret-top" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
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
                <el-button  @click="addDic" class="button">创建数据项</el-button>
                <div class="submit">
                    <el-button @click="back">返  回</el-button>
                    <el-button type="primary" :loading="addLoading" @click.native="submit">提  交</el-button>
                </div>
            </div>

            <!-- 添加字典项的对话框 -->
            <el-dialog
                title="添加数据项"
                :visible.sync="addFormVisible"
                width="40%"
                @close="addDialogClosed" >
                <!-- 内容的主体区域 -->
                <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
                    <el-form-item label="数据数值" prop="value">
                        <el-col :span="10">
                            <el-input v-model="addForm.value" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="数据名称" prop="name">
                        <el-col :span="10">
                            <el-input v-model="addForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="默认值" prop="isDefault">
                        <el-col :span="4">
                            <el-select v-model="addForm.isDefault" placeholder="默认值">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
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
                    <el-form-item label="数据数值" prop="value">
                        <el-col :span="10">
                            <el-input v-model="editForm.value"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="数据名称" prop="name">
                        <el-col :span="10">
                            <el-input v-model="editForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="默认值" prop="isDefault">
                        <el-col :span="4">
                        <el-select v-model="editForm.isDefault" placeholder="默认值">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
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
        addDic,
        addTeacher,
        batchRemoveTeacher, editDic,
        editTeacher, getDicDetail,
        getTeacherListPage, removeDicDetail,
        removeTeacher,getDictory
    } from '../../api/api'
        import dicList from './Dictionary'
       let num=0
        export default {
            data () {

                return {
                    // 获取用户列表的参数对象
                    queryInfo: {
                        // 查询参数
                        query: '',
                        //数据字典
                        dicCode:'',
                        // 当前的页码数
                        pagenum: 1,
                        // 每页显示多少条数据
                        pagesize: 5
                    },
                    // 获取的字典列表
                    dicList: [],
                    // 总数
                    total: 0,
                    //列表加载
                    listLoading:false,
                    // 控制添加用户对话框的显示与隐藏，默认为隐藏
                    addFormVisible: false,
                    addLoading:false,
                    //数据字典
                    dicForm:{
                        typename:'',
                        code:'',
                        index:'six'
                    },
                    dicFormRules: {
                        typename: [
                            {required: true, message: '请输入中文标识', trigger: 'blur'},
                        ],
                        code: [
                            {required: true, message: '关键字必填', trigger: 'blur'},
                        ]
                    },
                    // 添加用户的表单数据
                    addForm: {
                        value:num,
                        name:'',
                        isDefault:'否'
                    },
                    // 添加表单的验证规则对象
                    addFormRules: {
                        value: [
                            {required: true, message: '请输入数据数值', trigger: 'blur'},
                        ],
                        name: [
                            {required: true, message: '请输入数据名称', trigger: 'blur'},
                        ]
                    },
                    //编辑
                    editLoading: false,
                    editFormVisible:false,
                    editForm: {
                        value:'',
                        name:'',
                        id:'',
                        isDefault:'否'
                    },
                    editFormRules: {
                        value: [
                            {required: true, message: '请输入数据数值', trigger: 'blur'},
                        ],
                        name: [
                            {required: true, message: '请输入数据名称', trigger: 'blur'},
                        ]
                    },
                }
            },
            created () {
                this.getUserList()
            },
            methods: {
                async getUserList(){
                    await this.getDicDetail()
                    await this.getDic()
                },
                async getDic () {
                    console.log(1)
                    console.log(this.$store.state.dicCode)
                    this.queryInfo.dicCode=this.$store.state.dicCode
                    this.listLoading=true
                    getDicDetail(this.queryInfo).then((res) => {
                        this.total = res.data.total
                        this.dicList = res.data
                        // console.log(this.dicList)//字典项
                        this.listLoading=false
                    })
                },
                async getDicDetail() {
                    this.queryInfo.dicCode=this.$store.state.dicCode
                    this.listLoading=true
                    getDictory(this.queryInfo).then((res) => {
                        this.dicForm = res.data[0]          //字典
                        this.listLoading=false
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
                // 监听添加用户对话框的关闭事件
                addDialogClosed () {
                    this.$refs.addFormRef.resetFields()
                    this.$refs.editForm.resetFields()
                },
                addDic(){
                    this.addForm.value=num
                    this.addFormVisible=true
                },
                // 点击按钮，添加新用户
                addUser () {
                    this.$refs.addFormRef.validate(async valid => {
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.addLoading = true
                                let para1 = Object.assign({}, this.addForm)
                                console.log(para1)
                                let para2 = Object.assign({}, this.dicForm)
                                let para= JSON.parse((JSON.stringify(para1) + JSON.stringify(para2)).replace(/}{/, ','));
                                console.log(para)
                                addDic(para).then((res) => {
                                    if(res.code==200) {
                                        this.addLoading = false
                                        this.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        })
                                        num++
                                        this.addFormVisible = false
                                        this.getUserList()
                                    }else if(res.code==400){
                                        this.addLoading = false
                                        this.$message({
                                            message: '数值重复',
                                            type: 'fail'
                                        })
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
                    console.log(this.editForm)
                },
                //编辑提交
                editSubmit: function () {
                    this.$refs.editForm.validate((valid) => {
                        if (valid) {
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                                this.editLoading = true
                                let para1 = Object.assign({}, this.editForm)
                                let para2 = Object.assign({}, this.dicForm)
                                //let para= JSON.parse((JSON.stringify(para1) + JSON.stringify(para2)).replace(/}{/, ','));
                                editDic(para1).then((res) => {
                                    if(res.code==200) {
                                        this.editLoading = false
                                        this.$message({
                                            message: res.msg,
                                            type: 'success'
                                        })
                                        this.editFormVisible = false
                                        this.getUserList()
                                    }else if(res.code==400){
                                        this.addLoading = false
                                        this.$message({
                                            message: '数值重复',
                                            type: 'fail'
                                        })
                                    }
                                })
                            })
                        }
                    })
                },
                back(){
                    this.$router.push({ path: "/dictionary", query: {} });
                },
                submit(){
                    this.$router.push({ path: "/dictionary", query: {} });
                },
                //删除
                handleDel: function (index, row) {
                    this.$confirm('确认删除该记录吗?', '提示', {
                        type: 'warning'
                    }).then(() => {
                        this.listLoading = true
                        let para = {name: row.name}
                        removeDicDetail(para).then((res) => {
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
            height: 100%;
            border-radius: 5px;
        }
        .table{
            margin-top: 20px;
        }

        .button {
            margin-top: 10px;
            width: 100%;
            boder: 1px dashed;
        }
        .submit{
            margin-top: 10px;
            text-align: right;
        }

    </style>


