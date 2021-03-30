<template>
    <div class="manage-container">
        <div class="container">
                <div class="action">
                    <el-input v-model="search.name" placeholder="学生姓名/学号" class="input"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="Search" style="margin-left: 5px">搜索</el-button>
                    <el-button
                        type="primary"
                        @click="Insert"
                    >+新增学生</el-button>
                    <el-button
                        type="primary"
                        icon="el-icon-delete"
                        @click="dellSelection"
                    >批量删除</el-button>
                </div>
                <div class="view">
                <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="SelectionChange"
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="number" label="学号" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="school" label="学校" align="center"></el-table-column>
                    <el-table-column prop="course" label="课程" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">

                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="Edit(scope.$index, scope.row)"
                            >修改</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="Delete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="search.pageIndex"
                        :page-size="search.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
                </div>
            </div>

        <el-dialog title="添加学生"  width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="学号">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="form.school"></el-input>
                </el-form-item>
                <el-form-item label="课程">
                    <el-input v-model="form.course"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveInsert">确 定</el-button>
            </span>
        </el-dialog>
            <el-dialog title="修改信息" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="学号">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-input v-model="form.school"></el-input>
                    </el-form-item>
                    <el-form-item label="课程">
                        <el-input v-model="form.course"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>
        </div>
</template>

<script>
export default {
    name: 'StudentManage',
    data() {
        return {
            search: {
                id:'',
                number:'',
                name: '',
                school:'',
                course:'',
                pageIndex: 1,
                pageSize: 5
            },
            tableData: [
                {id:1,number:22,name: '魏凌',school:'福州大学',course:'工程训练'},
                {id:2,number:11,name: '杨礼亮',school:'福州大学',course:'工程训练'}
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
        };
    },
    methods: {
        getData() {

        },
        Search() {
            this.$set(this.search, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        Delete(index, row) {
            // 二次确认删除
            this.$confirm('确定删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        SelectionChange(val) {
            this.multipleSelection = val;
        },
        dellSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        Edit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        Insert(){
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
}
</script>

<style scoped>
.container{
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #FFFFFF;
    height:500px;
    border-radius: 5px;

}
.action{
    display: flex;
    flex-direction: row;
    padding: 30px 10px 20px 10px;
}
.view{
    margin-left: 10px;
    margin-right: 10px;
}
.input {
    width: 200px;
    display: inline-block;
}
.table {
    font-size: 14px;
    margin-bottom: 15px;
}
.red {
    color: #ff0000;
}
</style>
