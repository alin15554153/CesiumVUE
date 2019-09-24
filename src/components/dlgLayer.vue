<template>
  <el-container>
    <el-header height='40px'>
      <el-button type="text" title="添加" icon="el-icon-plus" @click="onLayerAddOpen"></el-button>
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
  import eventBus from '../js/eventBus'
  let id = 1
  export default {
    name: 'dlgLayer',

    data () {
      return {
        lastNodeSel: undefined,
        layerTreeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      eventBus.$on('getTarget', target => {
        console.log(target);
      });
      eventBus.$on('layerAdd', name => {
        this.layerAdd(name,true)
      });
    },
    methods: {
      nodeClick (ev) {
        let cn = this.$refs.tree.getCurrentNode()
        console.log(cn)
        if (this.lastNodeSel === undefined) {
          this.$refs.tree.$el.className = 'el-tree el-tree--highlight-current'
          this.lastNodeSel = cn
          return
        }
        if (this.lastNodeSel === cn) {
          this.$refs.tree.$el.className = 'el-tree'
          this.lastNodeSel = undefined
        } else {
          this.$refs.tree.$el.className = 'el-tree el-tree--highlight-current'
          this.lastNodeSel = cn
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
      layerAdd (layerName, isFinal) {
        let data = this.$refs.tree.getCurrentNode()
        if (data) {
          if (data.isFinal === true) {
            alert('终止节点类型禁止添加子节点')
            return
          }
        }
        const newChild = { id: id++, label: layerName, children: [], isFinal: isFinal }
        if (!data || this.lastNodeSel === undefined) {
          this.layerTreeData.push(newChild)
          return
        }
        if (!data.children && this.lastNodeSel !== undefined) {
          this.$set(data, 'children', [])
        }
        if (data) {
          data.children.push(newChild)
        }
      },
      onLayerAddOpen () {
        let data = this.$refs.tree.getCurrentNode()
        if (data) {
          if (data.isFinal === true) {
            alert('终止节点类型禁止添加子节点')
            return
          }
        }
        this.$prompt('请输入图层名称', '提示', {
          inputValue: '图层' + id,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(({ value }) => {
          this.layerAdd(value, false)
          this.$message({
            type: 'success',
            message: '你的图层名名称是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
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
