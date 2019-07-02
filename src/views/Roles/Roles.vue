<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- expand-change  是用来注册一个事件，在当前行被展开或者关闭的时候，会触发的事件 -->
        <el-table :data="roleList" stripe style="width: 100%" @expand-change="getRoleRights">
            <!-- type="expand" 给列加上这个属性之后，可以实现 展开行的效果 -->
            <el-table-column type="expand">
                <template>hello world</template>
            </el-table-column>
            <!-- el-table-column 只需要加上 type="index" 就可以自动生成序号列 -->
            <!-- :index="getIndex"  通过给index属性绑定函数，可以完成自定义序列号 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
            <el-table-column prop="roleDesc" label="描述" width="180"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" plain>分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleList: []
        };
    },
    methods: {
        // getIndex(index){
        //   console.log(index);
        //   // 这个方法最终的返回值，就是要填充到序号列中的序号
        //   let arr = ["一", "二", "三", "四", "五", "六", "七", "八"];
        //   return arr[index];
        // }

        async getRoleRights(row, expandedRows){
          // row就是当前行的数据
          // console.log(row, expandedRows);
          if(expandedRows.length){
            // console.log("展开");

            // 获取当前角色的权限信息
            console.log(row.id);
            let res = await this.$http({
              url: `roles/${row.id}`
            })

            console.log(res);

          }else{
            console.log("关闭");
          }
        }
    },
    async created() {
        let res = await this.$http({
            url: "roles"
        });

        // console.log(res);
        this.roleList = res.data.data;
    }
};
</script>

<style lang="">
</style>