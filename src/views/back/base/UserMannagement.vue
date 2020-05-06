<template>
    <div class="user">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>基础数据</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card max">
            <div slot="header" class="clearfix">
                <el-button type="text" class="adduser" @click="addUser">
                    <i class="el-icon-circle-plus-outline"></i>
                    新增用户
                </el-button>
                <el-radio-group v-model="radioi" @change="navTab">
                    <el-radio label="全部">全部</el-radio>
                    <el-radio :label="item" v-for="item in UserClass" :key="item.userTypeId">{{
                        item.userTypeTypeName
                    }}</el-radio>
                </el-radio-group>
            </div>
            <div class="item max">
                <el-table :data="radio"  class="tableClass" >
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column label="用户名称">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userMobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="密码">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userPassword }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userSex }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色名称">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userTypeTypeName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                :disabled="scope.row.disableDelete == true ? true : false"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="20%" @close="reset(ruleForm)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="demo-ruleForm">
                <el-form-item label="用户名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.role" placeholder="请选择">
                        <el-option
                            :label="item.userTypeTypeName"
                            :value="item.userTypeId"
                            v-for="item in UserClass"
                            :key="item.userTypeId"
                        ></el-option>
                    </el-select>
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
import request from '@/api/UserMannage';
export default {
    data() {
        // 手机号验证正则
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
            radioi:"全部",
            radio: [],
            tableData: [],
            UserClass: [],
            dialogFormVisible: false,
            titleMap: {
                addEquipment: '新增用户信息',
                editEquipment: '修改用户信息'
            },
            //新增和编辑弹框标题
            dialogStatus: '',
            oper: '',
            value: '',
            ruleForm: {
                UserUid: '',
                name: '',
                phone: '',
                password: '',
                sex: '',
                role: '',
                Usertypeid: '',
                userTypeTypeName:""
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '不低于两位字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号无效', trigger: 'blur' },
                    { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式有误', trigger: 'blur' }
                ],  
                sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
                role: [{ required: true, message: '请选角色', trigger: 'blur' }]
            },
            formLabelWidth: '80px',
            index: '',
            tab:''
        };
    },
    created() {
        // 获取所以角色
        request.AllUser().then(res => {
            this.UserClass = res.data;
        });
        //获取所有用户
        request.AllTeacher().then(res => {
            this.tableData = res.data;
            this.radio = res.data;
        });
    },
    // 角色选项卡分类
    methods: {
        navTab(index){
            this.tab = index;
            if(index === "全部"){
               this.radio = this.tableData
            }else{
                let classUser =[];
                this.tableData.forEach(item => {
                   if(item.userUserTypeId === index.userTypeId){
                       classUser.push(item)
                   }
                });
               this.radio = classUser
                
            }
        },
        //新增用户
        addUser() {
            this.dialogStatus = 'addEquipment';
            this.oper = '添加';
            this.dialogFormVisible = true;
            this.ruleForm.name = '';
            this.ruleForm.phone = '';
            this.ruleForm.password = '';
            this.ruleForm.sex = '';
            this.ruleForm.role = this.tab.userTypeId;
            this.userTypeTypeName=this.tab.userTypeTypeName;
        },
        //新增提交
        newUser(formName) {
            
            request
                .addUser({
                    userName: formName.name,
                    userMobile: formName.phone,
                    userSex: formName.sex,
                    userPassword: formName.password,
                    userUserTypeId: formName.role
                })
                .then(res => {
                    if (res.data.code === 1) {
                        this.$message.success('添加成功');
                        this.dialogFormVisible = false;
                        let found = this.UserClass.find(item => {
                            return item.userTypeId === formName.role;
                        });
                        let UserData = res.data.data;
                        UserData.userTypeTypeName = found.userTypeTypeName;
                        UserData.disableDelete = false;
                        //判断是否是当前新增的列的数据，如果不是，不需要渲染到当前列中
                        if(formName.role==this.radio[0].userUserTypeId){
                            this.radio.push(UserData);
                        }
                        //新增的数据需要push到所有数据中
                        this.tableData.push(UserData);
                
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$message.error("添加失败");
                });
        },
        //修改用户
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.dialogStatus = 'editEquipment';
            this.oper = '修改';
            this.ruleForm.UserUid = row.userUid;
            this.ruleForm.name = row.userName;
            this.ruleForm.phone = row.userMobile;
            this.ruleForm.password = row.userPassword;
            this.ruleForm.sex = row.userSex;
            this.ruleForm.role = row.userUserTypeId;
            this.index = index;
           
        },
        //修改提交
        alterUser(formName) {
            request
                .AlterTeacher({
                    userUid: this.ruleForm.UserUid,
                    userName: formName.name,
                    userMobile: formName.phone,
                    userSex: formName.sex,
                    userUserTypeId: this.ruleForm.role,
                    userPassword: formName.password
                })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.warning('数据没有变化');
                        return false;
                    } else if (res.data.code === 1) {
                        this.$message.success('修改成功');
                        this.dialogFormVisible = false;
                        //获取分类中文名称
                        let found = this.UserClass.find(item => {
                            return item.userTypeId === formName.role;
                        });
                        //由于是修改数据，则修改总表数据
                        var  table=[];
                        this.tableData.forEach((item,Upindex )=> {
                            if(item.userUid == this.ruleForm.UserUid){
                                item.userMobile=formName.phone;
                                item.userName=formName.name;
                                item.userSex=formName.sex;
                                item.userPassword=formName.password;
                                item.userUserTypeId=this.ruleForm.role;
                                item.userTypeTypeName=found.userTypeTypeName;
                                table.push(item);
                            }else{
                                table.push(item);
                            }
                        });
                        this.tableData=table;
                        if(this.tab!="全部"&&this.tab!=""){
                            var radiodata =[];
                            this.tableData.forEach(item => {
                            if(item.userUserTypeId === this.tab.userTypeId){
                                radiodata.push(item)
                            }
                            });
                            this.radio = radiodata
                        }

                    } else {
                        this.$message.error('修改失败');
                    }
                })
                .catch(error => {
                    this.$message.error('修改失败');
                });
        },
        //关闭模态框清空表单
        reset(ruleForm) {
            this.$refs['ruleForm'].resetFields();
        },
        //新增|修改提交
        submitForm(formName) {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    if (this.oper === '添加') {
                        this.newUser(formName);
                    } else {
                        this.alterUser(formName);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除用户
        handleDelete(index, row) {
            this.$confirm('确定要删除?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    request
                        .DeleteTeacher({
                            uid: row.userUid
                        })
                        .then(res => {
                            if (res.data.code === 1) {
                                 //删除总表数据
                                this.tableData.forEach((item,findex )=> {
                                    if(item.userUid == row.userUid){
                                        this.tableData.splice(findex, 1);
                                    }
                                });
                                //删除分类数据
                                this.radio.forEach((item,findex )=> {
                                    if(item.userUid == row.userUid){
                                        this.radio.splice(findex, 1);
                                    }
                                });
                                this.$message.success(res.data.message);
                                

                            } else {
                                this.$message.warning('删除失败');
                            }
                        })
                        .catch(error => {
                            this.$message.warning('删除失败');
                        });
                })
                .catch(error => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style scoped >
/deep/.tableClass{
    width: 100%;
    height: 100% !important;
}
.adduser {
    margin-right: 30px;
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
