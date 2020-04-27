<template>
    <div class="student">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基础数据</el-breadcrumb-item>
                <el-breadcrumb-item>学生管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card max">
            <div slot="header" class="clearfix">
                <el-select v-model="value" placeholder="请选择班级" @change="SelectClass">
                    <el-option :label="item.className" :value="item.classId" v-for="item in classList" :key="item.classId"></el-option>
                </el-select>
                <el-button class="btn" type="text" @click="addStudent()">
                    <i class="el-icon-circle-plus-outline"></i>
                    新增学生
                </el-button>
            </div>
            <div class="item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column label="班级名称">
                        <template slot-scope="scope">
                            <span>{{ scope.row.className }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="学生姓名">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuSex }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuMobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出生日期">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuBirthDay | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="年龄">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stuAge }}</span>
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
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="20%" @close="reset(ruleForm)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
                <el-form-item label="班级" prop="region" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择" @change="SelectClass">
                        <el-option :label="item.className" :value="item.classId" v-for="item in classList" :key="item.classId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学生名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="sledate"  :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.sledate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="resource" :label-width="formLabelWidth">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.password"></el-input>
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
import request from '../../../api/Student';
import { formatDate } from '../../../utils/data';
export default {
    name: '',
    data() {
        // 账号验证正则
        let checkPhone = (rule, value, callback) => {
            const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;

            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (phoneReg.test(value)) {
                    callback();
                } else {
                    callback(new Error('账号格式有误'));
                }
            }
        };
        return {
            class: '',
            classId: '311',
            value: '',
            dialogFormVisible: false,
            titleMap: {
                addEquipment: '新增学生信息',
                editEquipment: '修改学生信息'
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            oper: '',
            ruleForm: {
                studentid:'',
                region: '',
                name: '',
                sledate: '',
                phone: '',
                resource: '',
                password: ''
            },
            rules: {
                region: [{ required: false, message: '请选择班级', trigger: 'change' }],
                name: [
                    { required: true, message: '请输入学生名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '不低于两位字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号无效', trigger: 'blur' },
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                sledate: [{ required: true, message: '请选择时间',trigger: 'blur' }],
                resource: [{ required: true, message: '请选择性别', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ]
            },
            formLabelWidth: '80px',
            selct: '',
            classList: '',
            tableData: [],
            index:''
        };
    },
    methods: {
        // 选择班级
        SelectClass(rowItem) {
            request
                .ClassAll({
                    classId: rowItem
                })
                .then(res => {
                    this.tableData = res.data;
                });
        },
        reset(ruleForm) {
            this.$refs['ruleForm'].resetFields();
        },
        //新增|修改提交
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    if (this.oper === '添加') {
                        this.NewStudent(formName);
                    }else{
                        this.alterStudent(formName);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //新增学生
        NewStudent(formName){
            request.AddStudent({
                stuName:formName.name,
                stuClassId:this.value,
                stuBirthDay:formName.sledate,
                stuMobile:formName.phone,
                stuPassword:formName.password,
                stuSex:formName.resource
            })
            .then(res=>{
                console.log(res.data)
                if(res.data.code === 1){
                    this.$message.success('添加成功');
                    this.tableData.unshift(res.data.data);
                    this.dialogFormVisible = false;
                }else{
                    this.$message.error('添加失败');
                }
            })
            .catch(error=>{
                    this.$message.error('添加失败');
            })
        },
        // 修改按钮
        handleEdit(index, row) {
            this.index = index;
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
            this.ruleForm.studentid = row.stuUid;
            this.ruleForm.region = row.className;
            this.ruleForm.name = row.stuName;
            this.ruleForm.sledate = row.stuBirthDay;
            this.ruleForm.phone = row.stuMobile;
            this.ruleForm.resource = row.stuSex;
            this.ruleForm.password = row.stuPassword;
        },
        // 修改学生
        alterStudent(formName){
            request.AlterStudent({
                stuUid:formName.studentid,
                stuName:formName.name,
                stuBirthDay:formName.sledate,
                stuClassId:this.value,
                stuMobile:formName.phone,
                stuPassword:formName.password,
                stuSex:formName.resource
            })
            .then(res=>{
                if(res.data.code === 0){
                    this.$message.warning('数据没有变化');
                    return false;
                }else if(res.data.code === 1){
                    this.$message.success('修改成功');
                    this.tableData[this.index].stuName = formName.name;
                    this.tableData[this.index].stuSex = formName.resource;
                    this.tableData[this.index].stuMobile = formName.phone;
                    this.tableData[this.index].stuBirthDay = formName.sledate;
                    this.tableData[this.index].stuAge = res.data.data;
                    this.dialogFormVisible = false;
                }else{
                    this.$message.error('修改失败');
                }
            })
            .catch(error=>{
                this.$message.error('修改失败');
            })
        },
        //删除
        handleDelete(index, row) {
            this.$confirm('确定要删除?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    request
                        .DeleteStudent({
                            uid: row.stuUid
                        })
                        .then(res => {
                            if (res.data.code === 1) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            } else {
                                this.$message.warning('删除失败');
                            }
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
        },
        // 清空模态框
        addStudent() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.dialogFormVisible = true;
            // this.ruleForm.region = "";
            this.ruleForm.name ="";
            this.ruleForm.sledate = "";
            this.ruleForm.phone ="";
            this.ruleForm.resource = "";
            this.ruleForm.password = "";
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
        //获取所有班级的信息
        request.AllClass().then(res => {
            this.classList = res.data;
            this.class = res.data.slice(-1)[0].className;
            this.value = res.data.slice(-1)[0].classId;
        });
        // 获取班级的所有信
        request
            .ClassAll({
                classId: this.classId
            })
            .then(res => {
                this.tableData = res.data;
            });
    }
};
</script>

<style scoped>
.btn {
    left: right;
    margin-left: 20px;
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
.submitbtn {
    width: 100%;
    text-align: center;
}
</style>
