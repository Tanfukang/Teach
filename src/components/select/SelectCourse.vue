<!-- 课程选择组件
courseId(课程id)
courseName(课程名字)  -->
<template>
    <el-select class="sele" v-model="classId" placeholder="请选择专业课程" ref="focs">
        <el-option v-for="item in getAllCourse" :key="item.courseId" :label="item.courseName" :value="item.courseId"></el-option>
    </el-select>
</template>

<script>
import request from '@/api/Class';

export default {
    name: 'ZJAllLessonsSelect',
    data() {
        return {
            getAllCourse: '', //专业课程的数据
            classId: '' //专业课程编号
        };
    },
    model: {
        prop: 'course', //专业课程，使用v-model绑定
        event: 'handleChange' //触发事件
    },
    props: {
        course : {
            required: true, //必填
            type: Object
        },
        size: {
            required: false,
            type: String,
            default: 'medium'
        }
    },

    created() {
        this.ApiClass();
    },
    methods: {
        ApiClass() {
            /**获取所有课程 */
            request.AllCourse().then(res => {
                this.getAllCourse = res.data; 
                /**加载赋值 */
                this.$nextTick(() => {
                    this.classId = this.course.courseId;
                   
                });
            });
        }
    },
    watch: {
        /**监听v-model的clas值 */
        'course.courseId'(value) {
            this.classId = value;
        },
        classId(value) {
            let course = this.getAllCourse.find(p => p.courseId == value);
            if (course ) {
                course = JSON.parse(JSON.stringify(course));
            } else {
                course = {
                    courseId:'',
                    course:'' 
                };
            } /**向父组件传值 */
            this.$emit('handleChange', course);
        }
    }
};
</script>

<style scoped>
    .sele{
        width: 100%;
    }
</style>