import { useEffect, useState } from "react";
import {  toast } from 'react-toastify';

function App() {
      const [item, setItem] = useState('');
      const [grocery , setGrocery] = useState(()=>localStorage.getItem("grocery")? JSON.parse(localStorage.getItem("grocery")):[])

      function handleSubmit(e){
        e.preventDefault();
        if(!item.trim()){
         toast.warn("Please Enter a Grocery item", {position: "top-center",})
        }else if(!/^[A-Za-z]+$/.test(item)){
          toast.error("Please Enter a valid Grocery item", {position: "top-center",})
        }else if(grocery.includes(item)){
          toast.warn("Item is already exist", {position: "top-center",})
        }
        else{
          const updatedGrocery = [...grocery , item]
            setGrocery(updatedGrocery);
            toast.success("Item added Successfully", {position: "top-center",})
            
        }
        setItem('')
      }
      useEffect(()=>{
        localStorage.setItem("grocery" , JSON.stringify(grocery));
      } , [grocery])
      function handleDelete(id){
          const filteredGrocery = grocery.filter((grocery, index)=>index !== id)
          return setGrocery(filteredGrocery);
      }

  return (
    <>
      <section className="w-full bg-gray-100 h-screen flex justify-center items-center">
        <div className="box flex w-[80%] rounded-md max-w-md md:max-w-lg bg-white shadow-md p-8 flex-col items-center">
          <h1 className="md:text-2xl text-xl mb-4 underline">Grocery Bud</h1>
          <form className="flex justify-center items-center mb-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="item"
              value={item}
              onChange={(e)=>setItem(e.target.value)}
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
                <input type="checkbox" />
                <p className="text-sm md:text-lg text-gray-500 ">{ele}</p>
              </div>
              <button onClick={()=>handleDelete(index)} className="text-white bg-red-500 md:text-lg text-sm hover:bg-red-600 py-1 md:py-2 px-3 rounded-md text-center md:px-4">Delete</button>
            </div>
          )}
          
        </div>
      </section>
    </>
  );
}

export default App;
