<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#ffffff"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../utils/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-menu',
                    index: '3',
                    title: '基础数据',
                    subs: [
                        {
                            index: 'ClassMannagement',
                            title: '班级管理'
                        },
                        {
                            index: 'StudentMannagement',
                            title: '学生管理'
                        },
                        {
                            index: 'UserMannagement',
                            title: '用户管理'
                        },
                        {
                            index: 'RoleMannagement',
                            title: '角色管理'
                        },
                        {
                            index: 'ChangePassword',
                            title: '修改密码'
                        }
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '6',
                    title: '在线测试',
                    subs: [
                        {
                            index: 'Paper',
                            title: '老师出卷'
                        },
                        {
                            index: 'PaperMannagement',
                            title: '试卷管理'
                        },
                        {
                            index: 'OnTest',
                            title: '安排测试'
                        },
                        {
                            index: 'Readpaper',
                            title: '批阅试卷'
                        },
                        {
                            index: 'TestgRade',
                            title: '测试成绩'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {

            return this.$route.path.replace('/', '');
            
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.is-active{
    color: #FFEB3A !important;
}
.el-icon-menu{
    color: #ffffff;
}
</style>
