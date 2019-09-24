const mixin = {
  data() {
    return {
      hello1: 'hello Mixin'
    }
  },
  created() {
    console.log('在mixin中vue的data、生命周期、方法等都可以使用');
  },
  methods: {
    hello() {
      console.log(this.hello1);
    }
  }
}
export default mixin;
