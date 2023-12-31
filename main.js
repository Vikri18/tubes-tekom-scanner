const keyword = ["and","array","asm","begin","case","const","constructor","div","do","export","nil","not","object","of","or","packed","procedure","program","record","shl","shr","file","for","function","goto","if","implementation","in","inherited","label","library","mod","string","then","to","type","write","writeln","read","wincrt","crt","readln","unit","until","uses","wih","xor","else","set","interface","while","begin","end","downto","repeat","inline","var","integer","byte","longint"];
const opr = ["+", "-", "*", "/", ":=", "mod", "div"]
const log = ["<",">","=","<=",">=","!="]
const del = [".",",",":",";","(",")","[","]"]
var t_identifier = [],
t_keyword = [],
t_operator = [],
t_konstanta = {
    int : [],
    riil : [],
    chr : [],
    bool : [],
    str : []
  },
t_logic = [],
t_delimiter = [],
t_id = [],
kode = [],
srcCode

$("#convert").click(function(){     
  clear()
  srcCode = $("#hasilanalisis").val()
  getAnalisis = srcCode.trim()
  getAnalisis = getAnalisis.replace(/@"\{(.*)\}",/gi, "")
  var getString = getAnalisis.split(/(')/)          
  var getNumber = getAnalisis.split(/(\s|;)/)
  kode = getAnalisis.split(/(\s|;|\/\/|\(\*|\*\)|{|}|'|\(|\)|\[|\]|\,|\.)/)   
  console.log(kode)       
  kode = kode.filter(item => {
    return item !== '' && item !== ' '
  })                    
  
  var komentar = false          
  var isString = false          
  var lineString = []
  var lineOpr = []
  var oprTemp = []
  var logTemp = []
  var delTemp = []
  var keywordTemp          

  getNumber.forEach(item => {            
    if(/^[+-]?\d+\.\d+?$/.test(item)){
      t_konstanta.riil.push("'"+item+"'")
    }

    if(/^(-[0-9]|[0-9])/.test(item) && !/^[+-]?\d+\.\d+?$/.test(item)){                                      
      t_konstanta.int.push("'"+item+"'")
    }
  })

  getString.forEach(item => {
    if(isString){                          
      if(/'/g.test(item)){                
        isString = false                
        return
      }
      if(item.length == 1) 
        t_konstanta.chr.push("'"+item+"'")
      else
        t_konstanta.str.push("'"+item+"'")
      return
    }

    if(/'/g.test(item)){
      isString = true
      return
    }            
  });                            

  kode.forEach((item, key) => {            
    if(komentar){                      
      if(komentar == '//' && item == '\n') komentar = false
      if(komentar == '{' && /}/g.test(item)) komentar = false
      if(komentar == '(*' && /\*\)/g.test(item)) komentar = false              
      return
    }
    if(isString){
      if(/'/g.test(item)){
        isString = false
        lineString.push(key)
      }              
      return
    }

    if(/\/\//g.test(item)){ 
      komentar = '//' ;
      return
    }
    if(/{/g.test(item)){
      komentar = '{'
      return
    }
    if(/\(\*/g.test(item)){
      komentar = '(*'
      return
    }

    if(/'/g.test(item)){
      isString = true
      lineString.push(key)
      return
    }            
    keywordTemp = keyword.filter(value => {
      return value === item
    }).filter(onlyUnique)

    if(keywordTemp.length > 0){
      t_keyword.push("'"+keywordTemp[0]+"'")
      return
    }          

    oprTemp = opr.filter(value => {
      return new RegExp('\\'+value, 'g').test(item)
    }).filter(onlyUnique)            

    if(oprTemp.length > 0){
      t_operator.push("'"+oprTemp[0]+"'")
      lineOpr.push(key)
      return
    }

    logTemp = log.filter(value => {
      return new RegExp('\\'+value, 'g').test(item)
    }).filter(onlyUnique)

    if(logTemp.length > 0){
      t_logic.push("'"+logTemp[0]+"'")
      return
    }            

    delTemp = del.filter(value => {
      return new RegExp('\\'+value, 'g').test(item)
    }).filter(onlyUnique)
    
    if(delTemp.length > 0){
      t_delimiter.push("'"+delTemp[0]+"'")
      return
    }

    if(item == 'false' || item == 'true'){
      t_konstanta.bool.push(item)
      return
    }   
    
    if(/^[+-]?\d+(\.\d+)?$/.test(item)){                
        return
    }

    if(/([A-Za-z0-9]+)/g.test(item)){
      t_identifier.push("'"+item+"'")
      return
    }            
  })
    $('#identifier').val('['+t_identifier+']')
    $('#keywordout').val('['+t_keyword+']')
    $('#operator').val('['+t_operator+']')
    $('#delimiter').val('['+t_delimiter+']')
    $('#boolean').val('['+t_konstanta.bool+']')
    $('#char').val('['+t_konstanta.chr+']')
    $('#integer').val('['+t_konstanta.int+']')
    $('#riil').val('['+t_konstanta.riil+']')
    $('#string').val('['+t_konstanta.str+']')
//   console.log(t_keyword)
//   console.log(t_operator)          
//   console.log(t_logic)
//   console.log(t_konstanta)
//   console.log(t_delimiter)
//   console.log(t_id)
//   console.log(srcCode)    
})                

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}




function clear(){
  t_identifier = []
  t_keyword = []
  t_operator = []
  t_konstanta = 
    {
      int : [],
      riil : [],
      chr : [],
      bool : [],
      str : []
    };
  t_logic = []
  t_delimiter = []
  t_id = []
  kode = []   
}