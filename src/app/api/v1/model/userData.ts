/**
 * resume-data
 * API for managing my resume data
 *
 * The version of the OpenAPI document: 2023-01-16T13:44:13Z
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ResumeEntry } from './resumeEntry';
import { ConsumedCapacity } from './consumedCapacity';


export interface UserData { 
    Items: Array<ResumeEntry>;
    Count: number;
    ScannedCount: number;
    ConsumedCapacity: ConsumedCapacity;
}
