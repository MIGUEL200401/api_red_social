/**
 * Clse encargada de construir la respuesta del api estandar 
 */

export class ResponseHelper { 
    /**
     * Respuesta exitosa
     */
    static succes(
        data:any,
        statusCode= 200,
    ){
        return { 
            succes:true,
            statusCode,
            data

        }
    }

    /**
     * Respuesta de error
     */
    static error(
        data:any,
        statusCode = 400,
    ){
        return{
            succes: false,
            statusCode,
            data,
        }
    }
}