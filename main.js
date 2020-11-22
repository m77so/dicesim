const d = [1,2,3,4,5,6]

const ds = [ [], [0,1,1,1,1,1,1] ]

for(let i = 1; i <=8; i++){
    let l = new Array(i*6+7)
    for(let j = 0; j <l.length;j++) l[j]=0
    for(let j = 0; j < ds[i].length; j++){
        for(k=1;k<=6;++k){
            // j いままでの出目の合計
            // ds[i][j] その回数
            // k 次に出る出目
            // l[j+k] 次の目の回数
            l[j+k] += ds[i][j]
        }
    }
    ds[i+1] = [].concat(l)
}
const sum = (ds.map(l=>l.reduce((prev,current)=>prev + current,0)))
const f = function(targets, dice_num){
    let target_sum = ds[dice_num].filter((v,i)=>targets.includes(i)).reduce((prev,current)=>prev + current,0)
    let dice_sum = sum[dice_num]
    const res =  target_sum / dice_sum
    const fraction2 = new Intl.NumberFormat('ja', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    return target_sum===dice_sum?'100.0%':fraction2.format(res)
}
var example1 = new Vue({
    el: '#app_main',
    data: {
      numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
      .map(v=>{
          return {
              num: v,
              checkbox_id: "number_" + v
          }
      }),
      checked_val: []
    },
    computed:{
        d1:function(){return f(this.checked_val.map(v=>v.num), 1)},
        d2:function(){return f(this.checked_val.map(v=>v.num), 2)},
        d3:function(){return f(this.checked_val.map(v=>v.num), 3)},
        d4:function(){return f(this.checked_val.map(v=>v.num), 4)},
        d5:function(){return f(this.checked_val.map(v=>v.num), 5)},
        d6:function(){return f(this.checked_val.map(v=>v.num), 6)},
        d8:function(){return f(this.checked_val.map(v=>v.num), 8)},
    },
    methods:{
        clr: function(event){
            this.checked_val = []
        }
    }
  })