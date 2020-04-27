<template>
    <div class="role">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基础数据</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card max">
            <div slot="header" class="clearfix">
                <el-button class="btn" type="text" @click="NewRole()">
                    <i class="el-icon-circle-plus-outline"></i>
                    新增角色
                </el-button>
                <el-checkbox v-model="checked">允许拖拽</el-checkbox>
            </div>
            <div class="item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="#" type="index" width="100"></el-table-column>
                    <el-table-column label="班级名称">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="20%">
            <el-form :model="form">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">{{ oper }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    data() {
        return {
            checked: true,
            dialogFormVisible: false,
            form: {
                name: ''
            },
            titleMap: {
                addEquipment: '新增角色信息',
                editEquipment: '修改角色信息'
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            oper: '',
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '啦啦啦',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '止血无忧',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '企鹅企鹅',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            formLabelWidth: '100px'
        };
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.rowDrop();
            }, 100);
        });
    },
    methods: {
        //行拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;

            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0];
                    _this.tableData.splice(newIndex, 0, currRow);
                }
            });
        },
        NewRole() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.dialogFormVisible = true;
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
};
</script>

<style scoped>
.btn {
    margin-right: 20px;
    font-size: 15px;
}
</style>
