import { BaseContent } from "./BaseContent"
import { newGuid } from "@/models/Utils"

export class Status extends BaseContent {
         myspType = "Status";
         outOfTheBox?: boolean;
         setState?: number;
         id: string;

         constructor() {
           super()

           this.setState = 1
           this.outOfTheBox = true
           this.id = newGuid()
         }
}
