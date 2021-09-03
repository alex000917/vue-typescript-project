import { BaseContent } from "../BaseContent";
import { Button } from "./Button";

export class Ribbon extends BaseContent {
    myspType: string = "Ribbon";
    buttons: Button[] = [];
    ribbonType: number | null = null;
}