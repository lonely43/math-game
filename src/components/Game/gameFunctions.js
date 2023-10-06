const chars = `+-/*%`

var mathGen = {
   genOneSignExam(){
      let exam = {}
   
      const a = Math.floor(Math.random() * 1000)
      const sign = chars[Math.floor(Math.random() * chars.length)]
      const b = Math.floor(Math.random() * 1000)
   
      exam.question = `${a} ${sign} ${b}`
      exam.answer = Number(eval(exam.question).toFixed(2))
   
      return exam
   },
   genQuadraticEquations(){
      const chars = `+-`
      function createСoefficient(){
         let num = {
            value: Math.floor(Math.random() * 1000), 
            sign: chars[Math.floor(Math.random() * chars.length)]
         }
         return num
      }
   
      let exam = {}
   
      let a = createСoefficient()
      let b = createСoefficient()
      let c = createСoefficient()
   
      a = (a.sign == `+`) ? a.value : Number(a.sign + a.value)
   
      exam.question = `${a}x²${b.sign + b.value}x${c.sign + c.value}`
   
      b = Number(b.sign+b.value)
      c = Number(c.sign+c.value)
   
      let D = b**2-4*a*c
   
      if(D > 0){
         let x1 = (-b+Math.sqrt(D))/2*a
         let x2 = (-b-Math.sqrt(D))/2*a
         exam.answer = `${x1.toFixed(2)} ${x2.toFixed(2)}`
      }
      if(D == 0){
         let x = (-b+Math.sqrt(D))/2*a
         exam.answer = x.toFixed(2)
      }
      if(D < 0){
         exam.answer = `0`
      }
   
      return exam
   },

}

export default mathGen