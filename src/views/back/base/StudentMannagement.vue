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
                <el-select
                    v-model="this.default.class"
                    placeholder="请选择活动区域"
                    change="selectClass($event)"
                >
                    <el-option
                        :label="item.className"
                        :value="item.classId"
                        v-for="item in classList"
                        :key="item.classId"
                    ></el-option>
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
                            <span>{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="学生姓名">
                        <template slot-scope="scope">
                            <span>{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别" width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.sex }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template slot-scope="scope">
                            <span>{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="出生日期">
                        <template slot-scope="scope">
                            <span>{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="年龄" width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.age }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog
            :title="titleMap[dialogStatus]"
            :visible.sync="dialogFormVisible"
            center
            width="20%"
        >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="班级" prop="class" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.class" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学生名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday" required :label-width="formLabelWidth">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.birthday"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.phone"></el-input>
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
                    <el-button type="primary" @click="submitForm('ruleForm')">{{oper}}</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
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
            dialogFormVisible: false,
            titleMap: {
                addEquipment: '新增学生信息',
                editEquipment: '修改学生信息'
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            oper: '',
            ruleForm: {
                class: '',
                name: '',
                birthday: '',
                phone: '',
                resource: '',
                password: ''
            },
            default: {
                class: '',
                classId: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入学生名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                class: [{ required: true, message: '请选择班级', trigger: 'change' }],
                phone: [
                    { required: true, message: '手机号无效', trigger: 'blur' },
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                birthday: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
                resource: [{ required: true, message: '请选择性别', trigger: 'change' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ]
            },
            formLabelWidth: '80px',
            selct: '',
            classList: '',
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    age: '11',
                    sex: '男',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    age: '11',
                    sex: '男',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    age: '11',
                    sex: '男',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    age: '11',
                    sex: '男',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        addStudent() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.dialogFormVisible = true;
        },
        selectClass($event, item) {
            console.log(item);
        }
    },
    created() {
        //获取所有班级的信息
        this.axios.get('/api/Class/GetAllClass').then(res => {
            this.classList = res.data;
            this.default.class = res.data.slice(-1)[0].className;
            this.default.classId = res.data.slice(-1)[0].classId;
        });
        // 获取班级的所有信息
        this.axios
            .get('/api/Student/GetClassStudent', {
                params: {
                    classId: this.default.classId
                }
            })
            .then(res => {
                console.log(res);
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
