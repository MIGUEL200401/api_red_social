import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common'

/**
 * Captura de errores
 */
@Catch(HttpException)
export class HttpExceptioNFilter
implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {

        const response = 
            host.switchToHttp().getResponse();

        const status=
            exception.getStatus();

        response.status(status).json({
            succes:false,
            statusCode: status,
            data: exception.getResponse()
        });
    }

}