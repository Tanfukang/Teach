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
                <el-button class="btn" type="text" @click="newRole()">
                    <i class="el-icon-circle-plus-outline"></i>
                    新增角色
                </el-button>
                <el-checkbox v-model="checked">允许拖拽</el-checkbox>
            </div>
            <div class="item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" label="#" width="200px"></el-table-column>
                    <el-table-column label="角色名称">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userTypeTypeName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"  :disabled="scope.row.disable == true ? true : false">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="20%" @close="reset(ruleForm)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
                <el-form-item label="学生名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <div class="submitbtn">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm(ruleForm)">{{ oper }}</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/api/Role';
import Sortable from 'sortablejs';
export default {
    data() {
        return {
            checked: false,
            dialogFormVisible: false,
            ruleForm: {
                id: '',
                name: ''
            },
            titleMap: {
                addEquipment: '新增角色信息',
                editEquipment: '修改角色信息'
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '不低于两位字符', trigger: 'blur' }
                ]
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            //按钮改变状态
            oper: '',
            //初始数据渲染
            tableData: [],
            formLabelWidth: '100px',
            //表格行下标
            index: '',
            //拖拽之心
            order:''
        };
    },
    created() {
        request.allRole().then(res => {
            this.tableData = res.data;
        });
    },
    // mounted() {
    //     this.rowDrop();
    // },
    watch:{
       checked(){
           if (this.checked) {
              this.rowDrop(); 
           }else{
               this.order.destroy();
           }
       } 
    },
    methods: {
        //表格行拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;
            this.order = Sortable.create(tbody, {
                animation: 180,
                onUpdate: function(event) {
                    let newIndex = event.newIndex,
                        oldIndex = event.oldIndex,
                        $tr = tbody.children[newIndex],
                        $oldtr = tbody.children[oldIndex];
                    // 先删除移动的节点
                    tbody.removeChild($tr);
                    if (newIndex > oldIndex) {
                        tbody.insertBefore($tr, $oldtr);
                    } else {
                        tbody.insertBefore($tr, $oldtr.nextSibling);
                    }
                    let item = _this.tableData.splice(oldIndex, 1);
                    _this.tableData.splice(newIndex, 0, item[0]);
                    //更新视图操作后的数据
                    let newTableData = [];
                    //拖拽后拿到的序号和id
                    let upData = [];
                    let array = _this.tableData;
                    array.forEach((item, index) => {
                        item.userTypeSortNo = index;
                        newTableData.push(item);
                        //保存最新的序列数据
                        upData.push({
                            userTypeId: item.userTypeId,
                            userTypeSortNo: item.userTypeSortNo
                        });
                    });
                    _this.tableData = newTableData;
                    _this.orderUpate(upData);
                }
            });
        },
        //新增角色
        newRole() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.ruleForm.name = '';
            this.dialogFormVisible = true;
        },
        //添加提交
        addRole(formName) {
            request
                .addRole({
                    userRoleName: formName.name
                })
                .then(res => {
                    if (res.data.code === -2) {
                        this.$message.warning(res.data.message);
                        return false;
                    } else if (res.data.code === 1) {
                        this.$message.success(res.data.message);
                        this.tableData.unshift(res.data.data);
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error('添加失败');
                    }
                })
                .catch(error => {
                    this.$message.error('添加失败');
                });
        },
        // 关闭清空表单
        reset(ruleForm) {
            this.$refs['ruleForm'].resetFields();
        },
        //新增|修改提交
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    if (this.oper === '添加') {
                        this.addRole(formName);
                    } else {
                        this.alterRole(formName);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //修改角色
        handleEdit(index, row) {
            this.index = index;
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
            this.ruleForm.id = row.userTypeId;
            this.ruleForm.name = row.userTypeTypeName;
        },
        // 修改提交
        alterRole(formName) {
            request
                .AlterRole({
                    id: this.ruleForm.id,
                    userRoleName: formName.name
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.warning(res.data.message);
                        return false;
                    } else if (res.data.code === 1) {
                        this.$message.success('修改成功');
                        this.tableData[this.index].userTypeTypeName = formName.name;
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error('修改失败');
                    }
                })
                .catch(error => {
                    this.$message.error('修改失败');
                });
        },
        //删除角色
        handleDelete(index, row) {
            this.$confirm('确定要删除?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    request
                        .DeleteRole({
                            userRoleId: row.userTypeId
                        })
                        .then(res => {
                            if (res.data.code === 1) {
                                this.tableData.splice(index, 1);
                                this.$message.success(res.data.message);
                            } else {
                                this.$message.error('删除失败');
                            }
                        })
                        .catch(error => {
                            this.$message.error('删除失败');
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        //更新拖动列表数据
        orderUpate(updata) {
            request
                .OrderRole(updata)
                .then(res => {
                    if (res.data.code === 1) {
                        this.$message.success(res.data.message);
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$message.error('更改失败');
                });
        }
    }
};
</script>

<style scoped>
.btn {
    margin-right: 20px;
    font-size: 15px;
}
.max {
    max-height: 500px;
    overflow-y: auto;
}
.max::-webkit-scrollbar {
    width: 0;
}
.submitbtn {
    width: 100%;
    text-align: center;
}
</style>
