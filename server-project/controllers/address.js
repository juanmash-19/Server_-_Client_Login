const address_user = require("../models/address");

const createAddress=async(req,res)=>{

    try{
        const{nombre_pais,departamento,municipio,nomenclatura,direccion_activa} = req.body

        const address = new address_user({
            nombre_pais,
            departamento,
            municipio,
            nomenclatura,
            direccion_activa
        })
        const new_address = await address.save()
        res.status(201).json(new_address)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
module.exports={createAddress}