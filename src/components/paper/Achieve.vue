<template>
    <div class="achieve"> 
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{color:'#000000'}" >
            <el-table-column prop="date" label="科目" width="400" align='center'> </el-table-column>
            <el-table-column prop="name" label="选择题"  align='center'> </el-table-column>
            <el-table-column prop="address" label="填空题" align='center'> </el-table-column>
            <el-table-column prop="address" label="问答题" align='center'> </el-table-column>
            <el-table-column prop="address" label="总分" align='center'> </el-table-column>
        </el-table>
        <el-button type="primary" @click="last" class="">上一步</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ]
        };
    },
    created() {},
    methods: {}
};
</script>

<style scoped lang="less">
.el-table{
    color: black;
}
.el-table th td{
    line-height: 50px !important;
}
</style>
