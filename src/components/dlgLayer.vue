<template>
  <el-container>
    <el-header height='40px'>
      <el-button type="text" title="添加" icon="el-icon-plus" @click="onLayerAdd"></el-button>
      <el-button type="text" title="删除" icon="el-icon-delete-solid" @click="onLayerRemove"></el-button>
      <el-button type="text" title="重命名" icon="el-icon-edit" @click="onLayerEdit"></el-button>
    </el-header>
    <el-main>
      <el-tree
        ref="tree"

        :data="layerTreeData"
        show-checkbox
        node-key="id"
        @node-click
        :expand-on-click-node="false"
        default-expand-all
        :highlight-current='true'
        @node-click='nodeClick'

        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag">

      </el-tree>
    </el-main>
  </el-container>

</template>

<script>
  let id = 1000
  export default {
    name: 'dlgLayer',

    data () {
      return {
        lastNodeSel: undefined,
        layerTreeData: [{
          id: 0,
          label: '根节点',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      nodeClick (ev) {

        let cn = this.$refs.tree.getCurrentNode()
        console.log(cn)
        if (this.lastNodeSel === undefined) {
          this.lastNodeSel = cn
          this.$refs.tree.$el.className = 'el-tree el-tree--highlight-current'
          return
        }
        if (this.lastNodeSel === cn) {
          this.$refs.tree.$el.className = 'el-tree'
          this.lastNodeSel = undefined
        } else {
          this.$refs.tree.$el.className = 'el-tree el-tree--highlight-current'
          this.lastNodeSel=cn
        }
      },
      handleDragStart (node, ev) {
        console.log('drag start', node)
      },
      handleDragEnter (draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave (draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver (draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd (draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop (draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType)
      },
      allowDrop (draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner'
        } else {
          return true
        }
      },
      allowDrag (draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1
      },
      onLayerAdd () {
        let data = this.$refs.tree.getCurrentNode()
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data || this.lastNodeSel ===undefined) {
          this.layerTreeData.push(newChild)
          return
        }
        if (!data.children && this.lastNodeSel !==undefined) {
          this.$set(data, 'children', [])
        }
        if(data){
          data.children.push(newChild)
        }

      },
      onLayerEdit () {
        let data = this.$refs.tree.getCurrentNode()
        if (!data) {
          alert('请选择节点')
          return
        }
        let that = this
        this.$prompt('请输入图层名称', '提示', {
          inputValue: data.label,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {

          data.label = value
          this.$message({
            type: 'success',
            message: '你修改的图层是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      onLayerRemove () {
        // console.log(node)
        let data = this.$refs.tree.getCurrentNode()
        this.lastNodeSel = undefined
        const parent = this.$refs.tree.getNode(data).parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },

    }
  }
</script>
<style>
  body .el-tree {
    height: 500px;
  }

  body .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #409EFF;
  }

</style>
