import { useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";

function App() {
      const [item, setItem] = useState({text:"" , check:false});
      const [grocery , setGrocery] = useState(()=>localStorage.getItem("grocery")? JSON.parse(localStorage.getItem("grocery")):[]);

      function handleSubmit(e){
        e.preventDefault();
        if(!item.text.trim()){
         toast.warn("Please Enter a Grocery item", {position: "top-center",})
        }else if(!/^[A-Za-z]+$/.test(item.text)){
          toast.error("Please Enter a valid Grocery item", {position: "top-center",})
        }else if(grocery.some(ele => ele.text.toLowerCase() === item.text.toLowerCase())){
          toast.warn("Item is already exist", {position: "top-center",})
        }
        else{
          const updatedGrocery = [...grocery , {text:item.text , check:item.check}]
            setGrocery(updatedGrocery);
            toast.success("Item added Successfully", {position: "top-center",})
            
        }
        setItem({ text: "", check: false });
      }

      useEffect(()=>{
        localStorage.setItem("grocery" , JSON.stringify(grocery));
      } , [grocery])

      function handleDelete(id){
          toast.error("Item Deleted", {position: "top-center",});
          const filteredGrocery = grocery.filter((grocery, index)=>index !== id)
          return setGrocery(filteredGrocery);
      }

    function handleCheck(id){
      console.log(id);
      const updateGrocery = grocery.map((ele, index)=>index === id ? {...ele , check:!ele.check} : ele)
      setGrocery(updateGrocery)
    }

    function handleChange(e){
      console.log(e);
      const {name , value} = e.target ;
      setItem({...item , [name]:value})
    }

  return (
    <>
      <section className="w-full bg-gray-100 h-screen flex justify-center items-center">
        <div className="box flex w-[80%] rounded-md max-w-md md:max-w-lg bg-white shadow-md p-8 flex-col items-center">
          <h1 className="md:text-2xl text-xl mb-4 underline">Grocery Bud</h1>
          <form className="flex justify-center items-center mb-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              value={item.text}
              onChange={handleChange}
              className="py-1 px-3 bg-gray-100 md:text-lg text-sm"
              placeholder="Enter your Grocery item"
            />
            <button type="submit" className="text-white bg-emerald-500 md:text-lg text-sm hover:bg-emerald-600 py-1 md:py-2 px-2 md:px-4">
              Add Item
            </button>
          </form>
          {grocery.map((ele ,index)=>
              <div className="cards w-full flex justify-between items-center h-auto mb-2" key={index}>
              <div className="flex gap-4">
                <input type="checkbox" name="check" checked={ele.check} onChange={()=>handleCheck(index)}/>
                <p className={`text-sm md:text-lg  text-gray-500 ${ ele.check? "line-through" : ""} `}>{ele.text}</p>
              </div>
              <button onClick={()=>handleDelete(index)} className="text-white bg-red-500 md:text-lg text-sm hover:bg-red-700 py-1 md:py-2 px-2 rounded-md text-center"><FaRegTrashAlt/></button>
            </div>
          )}
          
        </div>
      </section>
    </>
  );
}

export default App;
