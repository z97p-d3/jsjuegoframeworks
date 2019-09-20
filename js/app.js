//cambiar color a titulo pricipal 

var animaciones = {

    nombre: "juan Perez",

    animartitulo: function () {
        $(".main-titulo").animate({
                color: 'red'
            }, "slow")
            .animate({
                color: 'yellow'
            }, "slow")
            .animate({
                color: 'white'
            }, "fast")
    },
    
    
    botonCambiarRinicio: function(){
        $("button").click(function(){
            $(".btn-reinicio").html('Reiniciar');
       

      
        });    
    },
    generarDulces: function(){
        
        $(".btn-reinicio").click(function(){
            
              $(".col-1").load('../image/1.png');
        });
        
      
     
    }
};

//ejecucion de animaciones
setInterval(animaciones.animartitulo, 500);
animaciones.botonCambiarRinicio();
animaciones.generarDulces();


//---------

