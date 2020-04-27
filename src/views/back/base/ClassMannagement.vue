<template>
    <div class="index">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基础数据</el-breadcrumb-item>
                <el-breadcrumb-item>班级管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card max">
            <div slot="header" class="clearfix">
                <el-button class="btn" type="text" @click="addClass()">
                    <i class="el-icon-circle-plus-outline"></i>
                    新增班级
                </el-button>
            </div>
            <div class="item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="#" type="index" width="50"></el-table-column>
                    <el-table-column label="班级名称">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.className }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="授课老师">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专业">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级人数">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.classStudents }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开班日期">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.classCreateTime | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                :disabled="scope.row.classStudents > 0 ? true : false"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="20%">
            <el-form :model="form" class="demo-ruleForm" status-icon>
                <el-form-item label="班级名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业课程" :label-width="formLabelWidth">
                    <el-select v-model="form.classCourseId" placeholder="请选择">
                        <el-option
                            :label="item.courseName"
                            :value="item.courseId"
                            v-for="item in allLessons"
                            :key="item.courseId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="授课老师" :label-width="formLabelWidth">
                    <el-select v-model="form.teacherId" placeholder="请选择">
                        <el-option :label="item.userName" :value="item.userId" v-for="item in Teacher" :key="item.userId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit(form)">{{ oper }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { formatDate } from '../../../utils/data';
import request from '../../../api/Class';
export default {
    name: '',
    data() {
        return {
            Teacher: [],
            allLessons: [],
            tableData: [],
            dialogFormVisible: false,
            //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
            titleMap: {
                addEquipment: '新增班级信息',
                editEquipment: '修改班级信息'
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            oper: '',
            form: {
                name: '',
                course: '',
                teacher: '',
                classId: '',
                teacherId: '',
                classCourseId: ''
            },
            formLabelWidth: '100px'
        };
    },
    methods: {
        // 点击添加
        addClass() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.dialogFormVisible = true;
            this.form.name = '';
            this.form.classCourseId = '';
            this.form.teacherId = '';
        },
        //添加后提交
        addSubmit(form) {
            request
                .AddClass({
                    className: form.name,
                    classCourseId: form.classCourseId,
                    classTeacherId: form.teacherId
                })
                .then(res => {
                    if (res.data.code === 1) {
                        this.$message.success('添加成功');
                        let Classid = res.data.data.classId;
                        request
                            .ClassAll({
                                classId: Classid
                            })
                            .then(res => {
                                this.tableData = res.data;
                            });
                        this.dialogFormVisible = false;
                    }
                })
                .catch(error => {});
        },
        //点击修改
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
            this.form.name = row.className;
            this.form.course = row.courseName;
            this.form.teacher = row.userName;
            this.form.classId = row.classId;
            this.form.classCourseId = row.classCourseId;
            this.form.teacherId = row.classTeacherId;
        },
        //修改后提交
        alterSubmit(form) {
            request
                .AlterClass({
                    classId: this.form.classId,
                    className: form.name,
                    classCourseId: this.form.classCourseId,
                    classTeacherId: this.form.teacherId
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.warning('数据没有变成');
                        return false;
                    } else if (res.data.code === 1) {
                        this.$message.success('修改成功');
                        request
                            .ClassAll({
                                classId: this.form.classId
                            })
                            .then(res => {
                                this.tableData = res.data;
                            });
                        this.dialogFormVisible = false;
                    }
                });
        },
        //提交
        submit(form) {
            if (this.oper === '添加') {
                if ((form.name && form.classCourseId && form.teacherId) === '') {
                    this.$message.error('请提交完整的班级信息');
                } else {
                    this.addSubmit(form);
                }
            } else {
                if ((form.name && form.classCourseId && form.teacherId) === '') {
                    this.$message.error('请提交完整的班级信息');
                } else {
                    this.alterSubmit(form);
                }
            }
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm('确定要删除?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    request
                        .DeleteClass({
                            classId: row.classId
                        })
                        .then(res => {
                            if (res.data.code === 1) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            } else {
                                this.$message.warning('删除失败');
                            }
                            return;
                        })
                        .catch(error => {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        });
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            console.log(index, row);
        }
    },
    // 格式化时间戳格式
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    created() {
        let _this = this;
        //获取所有的班级信息
        request
            .ClassAll()
            .then(res => {
                this.tableData = res.data;
            })
            .catch(error => {});
        //获取所有的课程
        request
            .AllCourse()
            .then(res => {
                this.allLessons = res.data;
            })
            .catch(error => {});
        //获取所有老师
        request
            .Allteacher()
            .then(res => {
                this.Teacher = res.data;
            })
            .catch(error => {});
    }
};
</script>

<style scoped>
.btn {
    left: right;
    padding: 3px 0;
    font-size: 15px;
}
.max {
    max-height: 500px;
    overflow-y: auto;
}
.max::-webkit-scrollbar {
    width: 0;
}
</style>
