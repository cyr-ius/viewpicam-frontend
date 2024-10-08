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


export interface Otp { 
    /**
     * Id
     */
    id: number;
    /**
     * The user name
     */
    name: string;
    /**
     * otp status
     */
    otp_confirmed?: boolean;
    /**
     * QR Code picture
     */
    otp_secret: string;
}

