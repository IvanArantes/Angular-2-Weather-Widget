import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform{
    transform(temp: number, unitType){
        switch (unitType){
            case "celsius":
                const celsius = (temp - 32) * 0.556;
                return celsius;
            default:
                return temp;
        }
    }
}