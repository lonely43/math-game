var mathGen = {
   genOneSignExam(){
      const chars = `+-/*%`
      let exam = {}
   
      const a = Math.floor(Math.random() * 1000)
      const sign = chars[Math.floor(Math.random() * chars.length)]
      const b = Math.floor(Math.random() * 1000)
   
      exam.question = `${a} ${sign} ${b}`
      exam.answer = Number(eval(exam.question).toFixed(2))
   
      return exam
   },
   // add more functions. LMAO ASSHOLE
   genQuadraticEquations(){
      console.log(`hahaha`)
   },

}

export default mathGen