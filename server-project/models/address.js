const mongoose=require("mongoose")

const address = mongoose.Schema ( {
    nombre_pais:{
        type:String,
        require:true
    },
    departamento:{
        type:String,
        require:true
    },
    municipio:{
        type:String,
        require:true
    },
    nomenclatura:{
        type:String,
        require:true
    },
    direccion_activa:{
        type:Boolean,
        require:true
    }
})

const User = mongoose.model("addressColection", address)

module.exports = User;