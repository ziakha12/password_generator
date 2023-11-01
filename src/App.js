
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  
  const [lenght , Setlenght] = useState(8);
  const [numAllow , SetnumAllow] = useState(false);
  const [charcAllow , SetcharcAllow] = useState(false);
  const [ password , Setpassword] = useState("")
  const [btnText , SetbtnText] = useState('copy')
  const ref = useRef(null)
  const btnRef = (null)


  const changePass = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow){
      str += '0123456789'
    }  
    if(charcAllow){
      str += "~!@#$%^&*_-+()\|:;'?></`"
    }
    for (let  i = 1 ; i <= lenght; i++ ){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
    Setpassword(pass)

  },[lenght,numAllow,charcAllow,Setpassword])



  const copyPassword = useCallback(()=> {
    setTimeout(()=>{
      ref.current.select()
      window.navigator.clipboard.writeText(password)
      SetbtnText('copied')
    },200)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(()=>{
    changePass()
  },[changePass])

  return (
    <div className="App bg-[black] h-screen overflow-hidden text-orange-400">
      <div className='password-body bg-[#4C4C4C] py-3 mt-3 px-2 h-fit rounded-lg max-w-md mx-auto'>
        <h1 className='text-white text-center text-2xl mb-3'>Auto Password Generator</h1>
        <div className='head flex'>
        <input
        value={password}
        type='text'
        className='outline-none w-full p-2 fw-bold' 
        placeholder='Password'
        readOnly
        ref={ref}
        />
        <button 
        className='bg-slate-500 text-white py-2 px-7 hover:bg-slate-700 transition '
        onClick={copyPassword}
        ref={btnRef}
        >
          {btnText}
        </button>
        </div>
        <div className='options flex flex-wrap mt-4'>
          <div className='lenght gap-2 flex align-items-center'>
            <input 
            min={6}
            max={17}
            value={lenght}
            type='range'
            name='lenght'
            className='w-50'
            onChange={(e)=>{Setlenght(e.target.value)}}
            />
            <label htmlFor='lenght'>lenght ({lenght})</label>
          </div>
          <div className='number gap-1 flex align-items-center'>
            <input 
            defaultChecked={numAllow}
            onChange={()=>{
              SetnumAllow(!numAllow)
            }}
            type='checkbox'
            name='numbers'
            />
            <label htmlFor='numbers'>Numbers</label>
          </div>
          <div className='Character gap-1 flex align-items-center ml-2'>
            <input 
            defaultChecked={charcAllow}
            onChange={()=>{
              SetcharcAllow(!charcAllow)
            }}
            type='checkbox'
            name='numbers'
            />
            <label htmlFor='numbers'>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
