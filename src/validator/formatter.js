let string = '        functionUP   '
let trim = function (){
    let str1= string.trim()
    console.log(str1)
 
}
  const lower='FUNCTIONUP IS ONE OF THE BEST BOOTCAMP'
  let string1 = function()
  {
      console.log(lower.toLocaleLowerCase())
  }

  const upper ='functionup is one of the best bootcamp'
let string2 = function()
{
    console.log(upper.toLocaleUpperCase())
}

module.exports.trim = trim
module.exports.string1=string1
module.exports.string2=string2