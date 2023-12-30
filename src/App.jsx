import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("")
  // const [copyButton,setCopyButton]= useState(false)

  // useRef hook

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*{}()~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, Password.length)
    window.navigator.clipboard.writeText(Password)
    window.alert("Password copied!")
  }, [Password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-500 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={Password}
            className='outline-none w-full py-1 px-3 my-4'
            readOnly
            placeholder='Password'
            ref={passwordRef}
          />
          <button className='outline-none text-white my-2 mx-2 bg-blue-700  px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-white my-2'>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1 my-2 text-white'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
                { console.log("Number Allowed: ", numberAllowed) }
              }}
            />
            <label htmlFor="numberInput" >Numbers</label>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
                { console.log("char Allowed: ", charAllowed) }
              }}
            />
            <label htmlFor="charInput" >Charecters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
