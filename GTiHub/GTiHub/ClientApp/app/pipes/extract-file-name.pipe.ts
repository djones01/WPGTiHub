import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "extractFileName" })
export class ExtractFileNamePipe implements PipeTransform {
    transform(value: string): string {
        if (value != undefined) {
            return value.replace(/\\/g, "/").replace(/.*\//, "");
        }
        else {
            return "";
        }            
    }
}