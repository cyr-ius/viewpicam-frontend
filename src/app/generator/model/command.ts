/**
 * ViewPI Camera
 * Backend for RaspiMjpeg
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CommandParamsInner } from './commandParamsInner';


export interface Command { 
    /**
     * Command
     */
    cmd: string;
    params?: Array<CommandParamsInner> | null;
}

