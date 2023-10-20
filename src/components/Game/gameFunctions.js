var mathGen = {
   genOneSignExam(max){
      const chars = `+-/*`

      let exam = {}
   
      const a = Math.floor(Math.random() * max)
      const b = Math.floor(Math.random() * max)
      const sign = chars[Math.floor(Math.random() * chars.length)]
      
      if(sign === `/`){
         const c = a * b
         exam.question = `${c} ${sign} ${a}`
         exam.answer = Number(b)
      }
      else{
         exam.question = `${a} ${sign} ${b}`
         exam.answer = Number(eval(exam.question).toFixed(0))
      }   
      return exam
   },
   genQuadraticEquations(max){
      const chars = `+-`
      function createСoefficient(){
         let num = {
            value: Math.floor(Math.random() * max), 
            sign: chars[Math.floor(Math.random() * chars.length)]
         }
         return num
      }
   
      let exam = {}
   
      let a = createСoefficient()
      let b = createСoefficient()
      let c = createСoefficient()

      a = Number(a.sign + a.value)
   
      exam.question = `${a}x²${b.sign + b.value}x${c.sign + c.value}`
   
      b = Number(b.sign+b.value)
      c = Number(c.sign+c.value)
   
      let D = (b**2-4*a*c).toFixed(0)
   
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
         exam.answer = 0
      }
   
      return exam
   },
}

export default mathGen