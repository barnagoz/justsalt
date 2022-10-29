import axios from 'axios'
import React from 'react'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

function MyRecipesTab(props) {
    const [sajatReceptek, setSajatReceptek] = useState([{}])
    const en = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
       setSajatReceptek(props.Receptek.filter((item)=> item.username === en.username))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.Receptek])

    async function deleteRecipe(id) {
        const resp = await axios.post(`${props.URL}recept/deleteMyRecipe`, {"userid" : en._id, "upass" : en.password, "recipeid" : id})
        console.log(resp.status)
        if(resp.status === 200){
            props.baseStateUpdateFn()
        }
    }
    return (
        <div className="w-full flex justify-evenly flex-wrap bg-grey-receptek">
            {sajatReceptek.map((item, index) => 
                <div className=" w-full md:w-1/3 lg:w-1/4 ossz-card p-2 md:m-1 lg:m-2 my-6 md:my-6 ld:my-6 hover:shadow-2xl shadow-md rounded-xl flex duration-700 bg-white">
                <Link to={`/recept/${item._id}`} className="w-full">
                  <img
                    alt="a cimben szereplo etel"
                    className=" w-full  h-44 object-cover rounded-xl"
                    src={item?.piclink}
                  ></img>
                  <h2 className="text-center mt-2 mb-2 text-lg font-semibold h-14">
                    {item.name}
                  </h2>
  
                  <p className="break-words h-20 overflow-hidden font-montserrat">
                    {item?.elkeszites?.substring(0, 75)}
                    {item?.elkeszites?.length > 75 ? "..." : null}
                  </p>
                  <div className="w-full mt-auto mb-0 flex">
                    <button className="hover:bg-red-300 duration-700 text-center mr-auto ml-auto mt-2 w-52 p-2 rounded-3xl bg-red-200 cursor-pointer">
                      Recept megtekintése
                    </button>
                  </div>
                </Link>
                <button onClick={() => deleteRecipe(item._id)}>X</button>
              </div>
            )}
        </div>
    )
}

MyRecipesTab.propTypes = {

}

export default MyRecipesTab

